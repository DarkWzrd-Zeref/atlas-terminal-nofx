import { ConfirmDialogProvider } from './components/common/ConfirmDialog'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AppRoutes } from './router/AppRoutes'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ConfirmDialogProvider>
          <AppRoutes />
          <footer
            aria-label="Source code and attribution"
            className="border-t px-4 py-4 text-center text-sm"
            style={{ background: '#F7F4EC', color: '#1A1813', borderColor: '#D6D0C4' }}
          >
            <a
              href="https://github.com/DarkWzrd-Zeref/atlas-terminal-nofx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Atlas NOFX source
            </a>
            {' · AGPL-3.0 · '}
            <a
              href="https://github.com/NoFxAiOS/nofx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Upstream NOFX
            </a>
          </footer>
        </ConfirmDialogProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
