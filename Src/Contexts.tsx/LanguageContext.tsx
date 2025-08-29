import React, { createContext, useContext } from 'react'
const LanguageContext = createContext<'ar'|'en'>('ar')
export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({children}) => (
  <LanguageContext.Provider value="ar">{children}</LanguageContext.Provider>
)
export const useLanguage = () => useContext(LanguageContext)
