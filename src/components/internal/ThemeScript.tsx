export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
              const theme = localStorage.getItem('settings/theme');theme && document.documentElement.classList.add(theme);
            `,
      }}
    ></script>
  );
}
