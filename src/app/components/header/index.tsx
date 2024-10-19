"use client"

import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'

import { usePathname } from "next/navigation";
// import logoImg from '/public/Logo.svg'
import { BellElectric, BookUser, LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getCookiesClient } from '@/lib/cookieClient';
import { api } from '@/app/services/api';
import { useEffect, useState } from 'react';

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [urlUser, setUrlUser] = useState("");

  const router = useRouter();

  // Verifica se a rota é ativa
  const pathname = usePathname(); // Pega a rota ativa
  const isActive = (path: string) => pathname === path;

  async function handleLogout() {
    deleteCookie("session", { path: "/" })
    toast.success("Logout feito com sucesso!")

    router.replace("/")
  }

  useEffect(() => {
    const token = getCookiesClient();

    async function getUser() {
      try {
        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUrlUser(response.data.profilePhoto);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar o usuário:", error);
        handleLogout(); // Redireciona se houver erro
      }
    }

    getUser();
  }, []);

  console.log(user)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/attendence">
          <Image
            alt="Logo Sujeito Pizza"
            src={"/logo.svg"}
            width={200}
            height={54}
            priority={true}
            quality={100}
          />
        </Link>

        <nav>

          <Link className={isActive("/attendence") ? styles.active : styles.link} href="/attendence">
            <p>Projetos</p>
          </Link>

          <Link className={isActive("/attendence") ? styles.active : styles.link} href="/attendence">
            <p>Sobre</p>
          </Link>

          <Link className={isActive("/attendence") ? styles.active : styles.link} href="/attendence">
            <p>Contato</p>
          </Link>
        </nav>


      </div>
    </header>
  )
}