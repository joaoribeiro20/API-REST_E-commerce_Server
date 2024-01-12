import { Product } from "../../../entities/store/Product";

export function shoppingClient(name: string, produtos: Product[]) {
    const productList = produtos.map(product => `<li>${product.name}</li>`).join('');

    return `
        <h1>Olá, ${name},<br> Sua compra foi realizada com sucesso!!</h1>
        <h2>Produtos comprados:</h2>
        <ul>
            ${productList}
        </ul>
        <a href="https://nodemailer.com/smtp/" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Clique aqui</a>
    `;
}