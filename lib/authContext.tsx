'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'

// 사용자 정보를 간단히 저장
interface AuthState {
  isLoggedIn: boolean
  userEmail: string | null
}

interface AuthContextType extends AuthState {
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 로컬 스토리지 키
const AUTH_STORAGE_KEY = 'userAuth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    userEmail: null,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  // 1. 초기 로드: localStorage에서 상태를 불러옵니다.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setAuth({
          isLoggedIn: !!parsed.userEmail,
          userEmail: parsed.userEmail || null,
        })
      }
    } catch (e) {
      console.error('Failed to parse auth state from localStorage', e)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // 2. 상태 변경 시 localStorage에 저장합니다.
  useEffect(() => {
    // isInitialized가 true일 때만 저장하여 초기 로드 시 덮어쓰기 방지
    if (isInitialized) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
    }
  }, [auth, isInitialized])

  // 3. 로그인 함수
  const login = useCallback((email: string) => {
    setAuth({
      isLoggedIn: true,
      userEmail: email,
    })
  }, [])

  // 4. 로그아웃 함수
  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
      userEmail: null,
    })
  }, [])

  const value = {
    ...auth,
    login,
    logout,
  }

  // 초기화 전에는 Context를 제공하며, isInitialized 상태를 외부에 노출하지 않습니다.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Context를 사용하기 위한 훅
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
