
export function endOfStock (nameSeller, nameProduct, stock){
    return  `<h1>${`Olá, ${nameSeller},<br> Voce seu produto ${nameProduct} esta com pouca quantidade no estoque !!.`}</h1>
    <h2>valor atual de estoque é (${stock}), porfavor fique atento ou atualize o valor</h2>
    <a href="${'https://nodemailer.com/smtp/'}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">${"click aqui"}</a>
  `;
}