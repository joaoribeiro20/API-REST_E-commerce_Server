import nodemailer from 'nodemailer';

const enviarEmail = async (para:string, assunto:string, mensagem:string, titulo:string) => {
    try {
      // Validate 'para' variable
      if (!para || !para.trim()) {
        throw new Error('Recipient email address is not provided.');
      }
  
      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // Hotmail SMTP server
        port: 587,
        secure: false,
        auth: {
          user: "devribeirotestes@hotmail.com",
          pass: "Jr55230326",
        },
      });
  
      const mailOptions = {
        from: titulo,
        to: para,
        subject: assunto,
        html: mensagem,
        /* text: mensagem, */
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
  
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Erro ao enviar o e-mail.');
    }
  };
  
  export default enviarEmail;
  


/* 
Host: endereço do seu servidor de smtp,

Service: endereço do seu servidor de smtp,

Porta: porta que será utilizada para mandar o e-mail, por padrão é sempre a porta 587,

Auth User: seu e-mail,

Auth Senha: sua senha.
*/