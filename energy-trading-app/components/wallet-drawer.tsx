'use client'

import * as React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from '@/components/ui/drawer'
import { ArrowUpRight, ArrowDownRight, Wallet, Calendar, TrendingUp, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WalletDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const transactions = [
    { id: 1, type: 'sell', amount: 5.2, price: 1300, date: '2024.01.29', time: '14:20', area: '제주 제주시' },
    { id: 2, type: 'buy', amount: 10.0, price: 2450, date: '2024.01.28', time: '09:15', area: '제주 서귀포시' },
    { id: 3, type: 'sell', amount: 8.3, price: 2075, date: '2024.01.26', time: '16:45', area: '제주 제주시' },
    { id: 4, type: 'sell', amount: 4.5, price: 1125, date: '2024.01.25', time: '11:30', area: '제주 제주시' },
    { id: 5, type: 'buy', amount: 15.0, price: 3600, date: '2024.01.24', time: '10:00', area: '제주 한림읍' },
    { id: 6, type: 'sell', amount: 12.0, price: 3000, date: '2024.01.22', time: '18:10', area: '제주 제주시' },
]

export function WalletDrawer({ open, onOpenChange }: WalletDrawerProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[90vh] bg-background border-border">
                <DrawerHeader className="border-b border-border pb-4">
                    <DrawerTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                        <Wallet className="w-5 h-5 text-primary" />
                        내 지갑
                    </DrawerTitle>
                    <DrawerDescription className="text-muted-foreground">
                        수익 현황과 에너지 거래 내역을 관리하세요.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="overflow-y-auto px-4 py-2 pb-10">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-3 py-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary/10 rounded-2xl p-4 border border-primary/20 space-y-1"
                        >
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                                <TrendingUp className="w-3 h-3" />
                                총 수익
                            </div>
                            <p className="text-lg font-bold text-foreground">42,420원</p>
                            <p className="text-[10px] text-muted-foreground">누적 정산 금액</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-secondary/50 rounded-2xl p-4 border border-border space-y-1"
                        >
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                <Zap className="w-3 h-3" />
                                충전 에너지
                            </div>
                            <p className="text-lg font-bold text-foreground">125.5 kWh</p>
                            <p className="text-[10px] text-muted-foreground">누적 충전량</p>
                        </motion.div>
                    </div>

                    <div className="space-y-4 py-2">
                        {/* Group by Date */}
                        {['오늘', '지난 기록'].map((group, groupIdx) => (
                            <div key={group} className="space-y-2">
                                <h3 className="text-xs font-semibold text-muted-foreground flex items-center gap-2 px-1">
                                    <Calendar className="w-3 h-3" />
                                    {group}
                                </h3>
                                <div className="space-y-2">
                                    {transactions
                                        .filter(tx => group === '오늘' ? tx.id <= 1 : tx.id > 1)
                                        .map((tx) => (
                                            <motion.div
                                                key={tx.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center",
                                                        tx.type === 'sell' ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                                                    )}>
                                                        {tx.type === 'sell' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-foreground">
                                                            {tx.type === 'sell' ? '에너지 판매' : '에너지 구매'}
                                                        </p>
                                                        <p className="text-[10px] text-muted-foreground">
                                                            {tx.date} {tx.time} • {tx.area}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={cn(
                                                        "font-bold text-sm",
                                                        tx.type === 'sell' ? "text-primary" : "text-foreground"
                                                    )}>
                                                        {tx.type === 'sell' ? '+' : '-'}{tx.price.toLocaleString()}원
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground">
                                                        {tx.amount} kWh
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
