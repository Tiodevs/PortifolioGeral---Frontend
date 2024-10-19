
import styles from "./page.module.scss";
import Image from "next/image";

import { getCookiesServer } from "@/lib/cookieServer";
import { Header } from "./components/header";
import { api } from "./services/api";

export default async function Home() {
  const token = getCookiesServer();

  const users = await api.get('users', {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });

  const resUsers = users.data;

  return (
      <div>

          <main className={styles.main}>
              <Header />
              <div className={styles.content}>
                  <div>
                      
                  </div>
                  
              </div>
          </main >
      </div >
  );
}
