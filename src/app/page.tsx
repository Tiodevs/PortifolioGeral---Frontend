'use client'

import styles from "./page.module.scss";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import { useRouter } from 'next/navigation';

import Image from 'next/image'
import { Form } from "./components/form";

export default function Home() {

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

    const handleClick = (id: string) => {
        router.push(`/project/${id}`); // Redireciona para a rota dinâmica
    };

    if (!loading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div> {/* Loader giratório */}
            </div>
        );
    }

    return (
        <div>
            <main className={styles.main}>
                {loading ? user && <Header /> : <></>}
                
                {loading ? user && <div className={styles.content}>

                    <div className={styles.capas}>

                        <div className={styles.capasitens}>
                            {user.album.map((item: any) => <div className={styles.project}>
                                <img src={item.campamini} className={styles.imgcapa} />
                                <button className={styles.buttonOverlay} onClick={() => handleClick(item.id)}>Ver Mais</button>
                            </div>)}

                        </div>
                    </div>

                    <div className={styles.sobre}>
                        <div className={styles.sobrecontainer}>

                            <div className={styles.capaperson}>
                                <Image
                                    alt="Logo Sujeito Pizza"
                                    src={"/capaluciano.png"}
                                    width={560}
                                    height={700}
                                    priority={true}
                                    quality={100}
                                    className={styles.imgperson}
                                />
                            </div>

                            <div className={styles.capainfo}>
                                <h2>
                                    Me chamo Luciano
                                </h2>
                                <p>Ofereço oportunidades para empresas e marcas se destacarem no mercado de trabalho através do meu trabalho de design gráfico, onde em menos de 3 anos vivo desse serviço que tanto amo, trabalhando de casa e de maneira profissional, mesmo sem um diploma da área que atuo. Espero que goste de alguns dos vários trabalhos que já fiz e tendo interesse não deixe de me contatar.</p>
                                <button>MAIS SOBRE MIM</button>
                            </div>
                        </div>
                    </div>

                    <Form />
                </div> : <></>}
            </main >
        </div >
    );
}
