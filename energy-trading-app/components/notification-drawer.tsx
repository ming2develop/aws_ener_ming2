'use client'

import * as React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription
} from '@/components/ui/drawer'
import { Bell, Zap, TrendingUp, AlertTriangle, CheckCircle2, Trash2, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useNotifications } from './notification-context'

interface NotificationDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NotificationDrawer({ open, onOpenChange }: NotificationDrawerProps) {
    const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications()

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[85vh]">
                <DrawerHeader className="border-b border-border pb-4">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-xl font-bold flex items-center gap-2">
                            <Bell className="w-5 h-5 text-primary" />
                            알림 센터
                        </DrawerTitle>
                        <div className="flex gap-4">
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                disabled={notifications.length === 0}
                            >
                                모두 읽음
                            </button>
                            <button
                                onClick={clearAll}
                                className="text-xs text-destructive hover:opacity-80 transition-opacity flex items-center gap-1"
                                disabled={notifications.length === 0}
                            >
                                <Trash2 className="w-3 h-3" />
                                전체 삭제
                            </button>
                        </div>
                    </div>
                    <DrawerDescription>
                        에너지 거래 및 시장 현황을 실시간으로 확인하세요.
                    </DrawerDescription>
                </DrawerHeader>

                <motion.div
                    layout
                    transition={{
                        layout: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
                    }}
                    className="overflow-y-auto px-4 py-2 space-y-1 pb-10 min-h-[300px]"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {notifications.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-3"
                            >
                                <Bell className="w-12 h-12 opacity-20" />
                                <p className="text-sm">새로운 알림이 없습니다.</p>
                            </motion.div>
                        ) : (
                            <motion.div key="list" layout className="space-y-1">
                                {notifications.map((notification) => (
                                    <motion.div
                                        key={notification.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={() => markAsRead(notification.id)}
                                        className={cn(
                                            "relative p-4 rounded-2xl flex gap-4 transition-all active:scale-[0.98] cursor-pointer",
                                            notification.read ? "opacity-60" : "bg-primary/5 border border-primary/20 shadow-sm"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                            notification.type === 'success' && "bg-primary/10 text-primary",
                                            notification.type === 'market' && "bg-blue-500/10 text-blue-500",
                                            notification.type === 'warning' && "bg-orange-500/10 text-orange-500",
                                            notification.type === 'truck' && "bg-indigo-500/10 text-indigo-500",
                                            notification.type === 'info' && "bg-secondary text-foreground",
                                        )}>
                                            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                                            {notification.type === 'market' && <TrendingUp className="w-5 h-5" />}
                                            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                                            {notification.type === 'truck' && <Truck className="w-5 h-5" />}
                                            {notification.type === 'info' && <Zap className="w-5 h-5" />}
                                        </div>

                                        <div className="flex-1 space-y-1 text-left">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-sm">{notification.title}</h4>
                                                <span className="text-[10px] text-muted-foreground">{notification.time}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {notification.description}
                                            </p>
                                        </div>

                                        {!notification.read && (
                                            <span className="absolute top-4 right-4 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </DrawerContent>
        </Drawer>
    )
}
