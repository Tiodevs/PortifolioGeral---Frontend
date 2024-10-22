'use client'

import styles from "./page.module.scss";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useRouter } from 'next/navigation';

import { Form } from "../components/form";

interface Props {
    params: {
        userId: string
    }
}

export default function Project({ params }: Props) {

    const decodedId = decodeURIComponent(params.userId as string).trim()

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get("/users");

                setUser(response.data[0]);

                console.log(response.data[0])
            } catch (error) {
                console.error("Erro ao carregar o usuário:", error);
            }
        }

        getUser();

        setLoading(true)
    }, [])

    if (!loading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    return (
        <div>
            <main className={styles.main}>
                {loading ? user && <Header /> : <></>}

                {loading ? user && <div className={styles.content}>

                    <div className={styles.header}>
                        <h1>Painel de administrador</h1>
                        <p>Configura sua plataforma aqui</p>
                        <a href="" className={styles.btn}>CRIAR ALBUM</a>
                    </div>

                    <div className={styles.projcts}>

                        {user.album.map((item: any) => <div className={styles.projct}>
                            <div className={styles.headerproject}>
                                <h1>{item.titulo}</h1>
                                <div className={styles.btnsproject}>
                                    <a href={`/adm/addphoto/${item.id}`} className={styles.btn}>Adicionar foto</a>
                                    <a href="" className={styles.btn}>Editar album</a>
                                    <a href="" className={styles.btn}>Deletar</a>
                                </div>

                            </div>
                            <div className={styles.fotosproject}>
                                {item.fotos.map((item:any) => <div className={styles.projectfotos}>
                                    <img src={item.foto} alt="" className={styles.imgfotos} />
                                    <button className={styles.buttonOverlay}>Exluir</button>
                                </div>)}
                            </div>
                        </div>)}

                    </div>

                </div> : <></>}
            </main >
        </div >
    );
}
