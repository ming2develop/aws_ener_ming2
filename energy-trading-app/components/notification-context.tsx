'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface Notification {
    id: string
    title: string
    description: string
    time: string
    type: 'info' | 'success' | 'warning' | 'market' | 'truck'
    read: boolean
}

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void
    markAsRead: (id: string) => void
    markAllAsRead: () => void
    clearAll: () => void
    unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: '에너지 트럭 출발',
            description: '요청하신 지역으로 에너지 트럭(제주 70자 1234)이 출발했습니다. 예상 도착 시간은 15분 뒤입니다.',
            time: '방금 전',
            type: 'truck',
            read: false,
        },
        {
            id: '2',
            title: '트럭 도착 예정',
            description: '에너지 트럭이 2분 뒤 도착 예정입니다. 안전한 거래를 위해 준비해 주세요.',
            time: '1분 전',
            type: 'warning',
            read: false,
        },
        {
            id: '3',
            title: '에너지 판매 완료',
            description: '5.2 kWh 판매가 성공적으로 완료되어 12,500원이 정산되었습니다.',
            time: '2시간 전',
            type: 'success',
            read: true,
        },
        {
            id: '4',
            title: '시장 가격 변동 알림',
            description: '현재 제주 지역 SMP 가격이 전 시간 대비 8% 상승했습니다.',
            time: '5시간 전',
            type: 'market',
            read: true,
        },
    ])

    const addNotification = useCallback((newNotif: Omit<Notification, 'id' | 'time' | 'read'>) => {
        const notification: Notification = {
            ...newNotif,
            id: Math.random().toString(36).substring(2, 9),
            time: '방금 전',
            read: false,
        }
        setNotifications(prev => [notification, ...prev])
    }, [])

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }, [])

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }, [])

    const clearAll = useCallback(() => {
        setNotifications([])
    }, [])

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            markAsRead,
            markAllAsRead,
            clearAll,
            unreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}
