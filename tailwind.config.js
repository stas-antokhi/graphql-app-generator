module.exports = {
  important: true,
  purge: ["./src/**/*.html", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          '100': '#72c1df',
          '200': '#5bb7d9',
          '300': '#43add4',
          '400': '#2ca2ce',
          '500': '#2e4756',
          '600': '#1289b5',
          '700': '#107aa1',
          '800': '#0e6a8d',
          '900': '#0c5b79'
        },
        accent: {
          '500': '#446e88'
        },
        warn: {
          '500': '#f8403a'
        },
        success: {
          '500': '#198754'
        }
      },
      fontFamily: {
        'primary': ['Crimson Text', 'serif'],
        'secondary': ['Amiko', 'sans-serif']
      }
    },
    // adapted angular material box-shadow
    boxShadow: {
      //        offset-x | offset-y | blur-radius | spread-radius | color
      DEFAULT: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      'lg': '3px 4px 2px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      none: 'none'
    },
    // adapted to angular material breakpoints
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
