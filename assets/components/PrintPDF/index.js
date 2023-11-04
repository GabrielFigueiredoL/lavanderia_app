import { Button } from "react-native-paper"
import { shareAsync } from "expo-sharing"
import { printToFileAsync } from "expo-print"

import { logo, facebook, instagram, telefone, email } from "./images"

function PrintPDF({ contactData, index }) {
  const {
    clientName,
    clientContact,
    localName,
    selectedDate,
    selectedItems,
    todayDate,
    totalValue,
    finalValue,
    discount,
    freightage,
    localCep,
  } = contactData

  const transformToMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatedIndex = index.toString().padStart(4, "0")

  const itemTableRows = selectedItems
    .map(
      (item) => `
    <tr>
      <td>${item.item.name}</td>
      <td>${transformToMoney(item.item.value)}</td>
      <td>${item.qtd}</td>
      <td>${transformToMoney(item.item.value * item.qtd)}</td>
    </tr>
  `
    )
    .join("")

  const renderLocalCep = () => {
    if (localCep) {
      return `
      <p><span>Cep: </span>${localCep}</p>
      `
    }
    return ``
  }

  const html = `
  <html>
  <head>
    <style>
* {
        margin: 0;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }

      body {
        padding: 30px;
      }

      span {
        font-weight: bold;
      }

      header {
        display: flex;
      }

      .header {
        margin-top: 35px
      }

      h3 {
        background-color: #d4d4d4;
        padding: 5px;
        margin: 10px 0;
      }

      .laundryInfo {
        display: flex;
        gap: 20px;
      }

      .laundryContact {
        display: flex;
        align-items: center;
        gap: 5px
      }

      .infos {
        display: flex;
        justify-content: right;
        gap: 4px;
      }

      .dates {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      .clientData {
        display: flex;
        justify-content: space-between;
      }

      .servicesInfo {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
      }

      th {
        color: #888888;
      }

      tr th,
      tr td {
        text-align: right;
      }

      tr th:first-child,
      tr td:first-child {
        text-align: left;
      }

      th,
      td {
        border-bottom: 1px solid #ddd;
        padding: 4px 0;
      }

      .serviceTotals {
        display: flex;
        justify-content: space-between;
        padding: 1px 0;
        font-weight: bold;
      }

      .serviceValues {
        margin-top: 10px;
      }

      .payment {
        display: flex;
        justify-content: space-between;
      }
    </style>
  </head>
  <body>
    <header>
      <img width="200" height="200" src=${logo} alt="logo babycare" />
      <div class="header">
        <h2>Baby Care Lavanderia Infantil</h2>
        <div class="laundryInfo">
          <div>
            <p>CNJP: 39.817.493.0001-92</p>
            <p>QNE 19 Lote 18</p>
            <p>Taguatinga, Comercial Norte</p>
            <p>Cep: 72125-190</p>
          </div>
          <div>
            <div class="laundryContact">
              <img src="${email}" />
              <p>babycarelavanderiainfantil@gmail.com</p>
            </div>
            <div class="laundryContact">
              <img src="${telefone}" />
              <p>(61) 98310-4317</p>
            </div>
            <div class="laundryContact">
              <img src="${instagram}" />
              <p>@babycare_lavanderiainfantil</p>
            </div>
            <div class="laundryContact">
              <img src="${facebook}" />
              <p>babycarelavanderiainfantil</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </header>
    <section class="clientInfo">
    <h1>Orçamento N°: ${formatedIndex}</h1>
      <div class="dates">
        <p><span>Data de emissão: </span>${todayDate}</p>
        <p><span>Data de entrega: </span>${selectedDate}</p>
      </div>
      <div>
        <h3>Cliente</h3>
        <div class="clientData">
          <div>
            <p><span>Nome: </span>${clientName}</p>
            <p><span>Endereço: </span>${localName}</p>
          </div>
          <div>
            <p><span>Celular: </span>${clientContact}</p>
            ${renderLocalCep()}
          </div>
        </div>
      </div>
    </section>
    <section class="servicesInfo">
      <h3>Serviços</h3>
      <table>
        <tr>
          <th>Descrição</th>
          <th>Preço Unitário</th>
          <th>Qtd.</th>
          <th>Preço</th>
        </tr>
        ${itemTableRows}
      </table>
      <div class="serviceValues">
        <div class="serviceTotals">
          <p>Valor Total</p>
          <p>${transformToMoney(totalValue)}</p>
        </div>
        <div class="serviceTotals">
          <p>Frete</p>
          <p>${transformToMoney(freightage)}</p>
        </div>
        <div class="serviceTotals">
          <p>Discontos</p>
          <p>- ${transformToMoney(discount)}</p>
        </div>
        <div class="serviceTotals">
          <p>Valor Final</p>
          <p>${transformToMoney(finalValue)}</p>
        </div>
      </div>
    </section>
    <section>
      <h3>Pagamento</h3>
      <div class="payment">
        <div>
          <p><span>Meios de pagamento</span></p>
          <p>Dinheiro, cartão ou pix</p>
        </div>
        <div>
          <p><span>PIX</span></p>
          <p>61983104317</p>
        </div>
      </div>
    </section>
  </body>
  </html>
  `

  async function generatePDF() {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    })

    await shareAsync(file.uri)
  }
  return (
    <Button
      mode="contained"
      buttonColor="#89CCC5"
      textColor="#F8F8F8"
      onPress={generatePDF}
    >
      Gerar Orçamento
    </Button>
  )
}

export default PrintPDF
