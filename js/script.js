// Google Sheets API link
const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLg4CymReN_FY2LLiGvWMJZmrG9E21OBHNp94tWV_6aNGEusxqdOQE56Y6Z9NkzJvtL3hTNW3UOJnH98vy8dVfYZptvJpuBRN5x2KLa5AaIRwLyaeBhvqu0gKvmypUo9LpIpVjO-mmwfJLWu-NvV8KPODKdoNL1L1SLb74rTz-keIk3ACfi55ETYlOd7Uy0BAgk3cu1WNtvc67RLEPFtCOOH4tdIzwqUXQg-BXGLIxWhEQm9XArMqvJuBlda5m6iQged2Z8w3CCfgysk507_OEVI1OgY4_1cR02wycCt&lib=M92rzB2Rf7P4WYU0MsKSZwEOK7OYQYxbk"

const loading = document.getElementById("loading")
const productsContainer = document.getElementById("products")
const cartCount = document.getElementById("cart-count")
let cart = 0

// Ma'lumotlarni olish
async function fetchProducts() {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    console.log("Sheet Data:", data)

    // Loading spinnerni yashirish
    loading.style.display = "none"

    // Har bir mahsulotni chiqarish
    data.forEach((item) => {
      const brand = item["👟 Brend"] || "Noma'lum brend"
      const price = item["💸 Narx (UZS)"] || "0"
      const image =
        item["📷 Rasm"] || "https://placehold.co/150x150?text=No+Image"

      const card = document.createElement("div")
      card.className =
        "group bg-white rounded-xl shadow-md p-4 flex flex-col items-center duration-300 hover:scale-105 hover:shadow-blue-800 hover:bg-blue-300 hover:text-white cursor-pointer"

      card.innerHTML = `
            <img src="${image}" alt="${name}" class="w-48 h-32 object-cover rounded-lg mb-4 duration-300 hover:scale-150">
            <h2 class="font-bold text-lg">${brand}</h2>
            <p class="text-blue-600 group-hover:text-white font-semibold">${price} so'm</p>
            <button class="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">Add to Cart</button>
          `

      // Savatchaga qo'shish tugmasi
      card.querySelector("button").addEventListener("click", () => {
        cart++
        cartCount.textContent = cart
      })

      productsContainer.appendChild(card)
    })
  } catch (error) {
    loading.innerHTML =
      "<p class='text-red-500'>Xatolik yuz berdi! API ishlamadi.</p>"
    console.error(error)
  }
}

fetchProducts()
