"use strict";

const quoteContent = document.querySelector(".quote-content");
const quoteAuthor = document.querySelector(".quote-author");
const button = document.querySelector(".btn");
const apiUrl = "https://quote-garden.onrender.com/api/v3/quotes";
let shuffledQuote;
let currectQuote = 0;

async function getApi(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response is okay");
    }

    const data = await response.json();
    const quoteDatas = data.data;

    if (!Array.isArray(quoteDatas)) {
      throw new Error("Invalid data format: quoteData is not an array");
    }

    const quoteObject = quoteDatas.map((quoteData) => ({
      text: quoteData.quoteText,
      author: quoteData.quoteAuthor,
    }));

    shuffledQuote = quoteObject.sort(() => Math.random() - 0.5);
    button.addEventListener("click", function () {
      if (currectQuote < shuffledQuote.length) {
        button.innerHTML = "Get New Quote";
        quoteContent.innerHTML = `" ${shuffledQuote[currectQuote].text} "`;
        quoteAuthor.innerHTML = ` By: ${shuffledQuote[currectQuote].author}`;
        currectQuote++;
      } else {
        quoteContent.innerHTML =
          "No More Quote available, Reload to start afreash";
        quoteAuthor.innerHTML = "App Powered By; Adetunji Jacob";
      }
    });
  } catch (error) {
    console.log("Error:", error.message);
  }
}
getApi(apiUrl);
