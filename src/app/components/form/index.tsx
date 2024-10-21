"use client"

import styles from './styles.module.scss'
import { InstagramIcon, Linkedin } from "lucide-react";


export function Form() {


  return (
    <div className={styles.mensagem}>

      <div className={styles.formcontent}>
        <div className={styles.infoform}>
          <div className={styles.contntinfo}>

            <h1>Contate-me</h1>

            <div className={styles.infoemail}>
              <p>Mande um email em <span>luciano@gmail.com</span></p>
              <p>Faça agora o seu <span>orçamento</span></p>
            </div>

            <div className={styles.infoicons}>
              <Linkedin size={27} color="#7121D7" />
              <InstagramIcon size={27} color="#7121D7" />
            </div>

          </div>

          <p className={styles.copy}>© 2024 Felipe Santos</p>


        </div>

        <form action="" className={styles.form}>
          <div>
            <p>Nome</p>
            <input type="text" />
          </div>
          <div>
            <p>Número</p>
            <input type="text" />
          </div>
          <div>
            <p>Mensagem</p>
            <textarea name="" id=""></textarea>
          </div>

          <button type="submit">ENVIAR</button>
        </form>
      </div>

    </div>
  )
}