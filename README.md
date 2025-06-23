# Calculator App

A fully responsive calculator built with HTML, CSS, and JavaScript.  
It supports light and dark themes, basic arithmetic operations, and error handling.

---

## 🔧 Features

- ✅ **Basic Operations:** Addition, Subtraction, Multiplication, Division.
- ✅ **Decimal Support**
- ✅ **Input Validation:** Prevents invalid inputs (e.g. multiple operators in a row, two decimals in a number).
- ✅ **Error Handling:** Displays `"Error"` when input ends with invalid characters or on division by zero.
- ✅ **Theming:** Three switchable themes using a circular toggle.
- ✅ **Responsive Design:** Works well on all screen sizes.

---

## 🧩 Tech Stack

- **HTML5**
- **CSS3** – Responsive design, theming via class toggling.
- **Vanilla JavaScript** – Full functionality written in plain JS.

---

## 🖥️ UI Preview

| Theme 1 (Default) | Theme 2 | Theme 3 |
|------------------|---------|----------|
| ![theme1](./images/theme1.png) | ![theme2](./images/theme2.png) | ![theme3](./images/theme3.png) |

---

## 🚀 Getting Started

Clone the repository and open the `index.html` file in your browser:

```bash
git clone https://github.com/your-username/calculator-app.git
cd calculator-app
open index.html

```

## 📁 File Structure

calculator-app/
├── index.html
├── styles.css
├── script.js
├── images/
│   └── favicon-32x32.png
│   └── [optional screenshot/theme images]
├── README.md


## 🧠 Logic Highlights

    handleNumberInput(value) – Prevents double decimals and operator misuse.

    handleEqualBtn() – Parses and calculates expression using calculator() and negativeHandler() helper.

    toggleThemeClass() – Dynamically switches themes by toggling CSS classes.

    calculator() – Performs arithmetic operations with proper operator precedence (*/ before +−).

    negativeHandler() – Safely handles negative numbers and splits input into tokens.

## 📜 License

This project is open source and free to use under the MIT License.
🙌 Credits

This app design is inspired by Frontend Mentor challenges and was fully built with vanilla technologies for learning purposes.

    Built with ❤️ by [Giorgi Grigolishvili]
