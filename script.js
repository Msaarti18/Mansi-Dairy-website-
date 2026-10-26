"use strict";

// PUREDROP DAIRY - WEBSITE SETTINGS
const CONFIG = {
  whatsappNumber: "918872987702"
};

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const orderForm = document.getElementById("orderForm");
  const productSelect = document.getElementById("productSelect");
  const formMessage = document.getElementById("formMessage");

  // Automatically update the copyright year
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close mobile navigation after selecting a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  // Product order buttons select the product in the order form
  document.querySelectorAll(".order-product").forEach((button) => {
    button.addEventListener("click", () => {
      productSelect.value = button.dataset.product;

      document.getElementById("order").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(() => {
        document.getElementById("customerName").focus({
          preventScroll: true
        });
      }, 500);
    });
  });

  // Submit order through WhatsApp
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return;
    }

    const name = document
      .getElementById("customerName")
      .value.trim();

    const phone = document
      .getElementById("customerPhone")
      .value.trim();

    const product = productSelect.value;

    const quantity = document
      .getElementById("quantity")
      .value;

    const address = document
      .getElementById("customerAddress")
      .value.trim();

    const notes = document
      .getElementById("orderNotes")
      .value.trim();

    if (!name || !phone || !product || !quantity || !address) {
      formMessage.textContent =
        "Please complete all required fields.";
      return;
    }

    const message = [
      "Hello PureDrop Dairy! 🥛",
      "",
      "I would like to place an order.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Product: ${product}`,
      `Quantity: ${quantity}`,
      `Delivery Address / Area: ${address}`,
      notes ? `Additional Note: ${notes}` : "",
      "",
      "Please confirm the final price and availability.",
      "Thank you!"
    ]
      .filter((line) => line !== "")
      .join("\n");

    const whatsappURL =
      `https://wa.me/${CONFIG.whatsappNumber}?text=` +
      encodeURIComponent(message);

    formMessage.textContent =
      "Opening WhatsApp. Please review and send your order.";

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow) {
      formMessage.textContent =
        "If WhatsApp did not open, use the WhatsApp contact link on this page.";
    }
  });
});