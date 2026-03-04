# Patungan

Split bill anywhere, anytime. A web application for easily calculating and managing shared expenses with multiple participants.

## Description

Patungan is a modern web application designed to simplify the process of splitting bills and managing shared expenses. Whether you're dining out with friends, sharing accommodation costs, or splitting any group expense, Patungan makes it easy to track items, assign them to participants, and automatically calculate each person's share including service charges and taxes.

## Features

- **Add Items**: Easily add food items with prices and quantities
- **Manage Participants**: Add and manage the list of people sharing the bill
- **Smart Item Assignment**: Assign items to one or multiple participants for flexible cost splitting
- **Additional Fees**: Support for service charges and tax calculations
  - Service Charge: Fixed amount or percentage-based
  - Tax (PPN): Standard Indonesian tax calculation
- **Automatic Calculations**: System automatically calculates individual shares including proportional fee distribution
- **Bilingual Support**: Full support for Indonesian (default) and English languages
- **Language Toggle**: Users can switch between languages at any time with persistent preferences
- **Summary View**: Clear breakdown of how much each person owes
- **Responsive Design**: Clean, modern UI built with Tailwind CSS

## Tech Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS 4
- **Internationalization**: vue-i18n v11
- **Additional Libraries**:
  - lucide-vue-next (icons)
  - reka-ui (UI components)
  - html-to-image (export functionality)
  - class-variance-authority (component styling)

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or v22.12.0 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dennwill/patungan.git
cd patungan
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── OrderedFood.vue     # Item management
│   ├── Participants.vue    # Participant management
│   ├── AdditionalFees.vue  # Fee configuration
│   ├── Claiming.vue        # Item assignment to participants
│   ├── Summary.vue         # Final bill breakdown
│   ├── Header.vue          # Application header with language toggle
│   ├── Tabs.vue            # Tab navigation
│   ├── LanguageToggle.vue  # Language switcher
│   └── ui/                 # Reusable UI components
├── stores/              # Pinia state management
│   ├── itemStore.js        # Item and fee state
│   └── nameStore.js        # Participant state
├── locales/             # Translation files
│   ├── id.json             # Indonesian translations
│   └── en.json             # English translations
├── styles/              # Global styles
├── i18n.js              # i18n configuration
├── main.js              # Application entry point
└── App.vue              # Root component
```

## How to Use

1. **Add Items**: Start by adding the items from your bill with their respective prices and quantities
2. **Add Participants**: Add the names of all people who will share the costs
3. **Configure Fees**: (Optional) Add service charges and taxes if applicable
4. **Claim Items**: Assign each item to the participants who will share it. Items can be shared among multiple people
5. **View Summary**: See the final breakdown showing how much each person owes

## Bilingual Support

The application supports both Indonesian and English:

- **Default Language**: Indonesian
- **Language Toggle**: Click the language toggle button in the header to switch between Indonesian (ID) and English (EN)
- **Persistent Selection**: Your language choice is saved in browser's localStorage and will be remembered on your next visit

## Future Plans

- **OCR Receipt Scanning**: Proper implementation of optical character recognition (OCR) to automatically scan and extract item details from receipt images
  - Integration with advanced OCR services for higher accuracy
  - Automatic price and quantity detection
  - Support for various receipt formats and layouts
- **Export Functionality**: Export bill summaries as PDF or image
- **Previous Transactions**: History tracking for past bills
- **Currency Support**: Multi-currency support for international use
- **Payment Integration**: Quick payment settlement features
- **Mobile App**: Native mobile application for iOS and Android

## Credits

- Logo Design: [@clarissamngndn](https://www.instagram.com/clarissamngndn/)

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

---

Made with attention to detail for seamless bill splitting experiences.
