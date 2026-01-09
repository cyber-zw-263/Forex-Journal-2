(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/calendar/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CalendarPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CalendarPage() {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CalendarPage.useState": ()=>("TURBOPACK compile-time value", "object") !== 'undefined'
    }["CalendarPage.useState"]);
    const [trades, setTrades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CalendarPage.useEffect": ()=>{
            if (!mounted) return;
            const fetchTrades = {
                "CalendarPage.useEffect.fetchTrades": async ()=>{
                    try {
                        const response = await fetch('/api/trades', {
                            headers: {
                                'x-user-id': 'demo-user'
                            }
                        });
                        if (!response.ok) {
                            let errBody = null;
                            try {
                                errBody = await response.json();
                            } catch (e) {
                                errBody = await response.text();
                            }
                            console.error('Failed to fetch trades:', response.status, errBody);
                            setTrades([]);
                            return;
                        }
                        const data = await response.json();
                        if (!Array.isArray(data)) {
                            console.warn('Unexpected trades payload in calendar page', data);
                            setTrades([]);
                            return;
                        }
                        setTrades(data);
                    } catch (error) {
                        console.error('Error fetching trades:', error);
                    }
                }
            }["CalendarPage.useEffect.fetchTrades"];
            fetchTrades();
        }
    }["CalendarPage.useEffect"], [
        mounted
    ]);
    const tradesByDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CalendarPage.useMemo[tradesByDate]": ()=>{
            const grouped = {};
            trades.forEach({
                "CalendarPage.useMemo[tradesByDate]": (trade)=>{
                    const date = new Date(trade.entryTime).toISOString().split('T')[0];
                    if (!grouped[date]) grouped[date] = [];
                    grouped[date].push(trade);
                }
            }["CalendarPage.useMemo[tradesByDate]"]);
            return grouped;
        }
    }["CalendarPage.useMemo[tradesByDate]"], [
        trades
    ]);
    const getDaysInMonth = (date)=>{
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (date)=>{
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    const days = Array.from({
        length: getDaysInMonth(currentMonth)
    }, (_, i)=>i + 1);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const emptyDays = Array.from({
        length: firstDay
    }, (_, i)=>null);
    const calendarDays = [
        ...emptyDays,
        ...days
    ];
    const selectedDateTrades = selectedDate ? tradesByDate[selectedDate] || [] : [];
    const getDayStats = (day)=>{
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
        const dayTrades = tradesByDate[date] || [];
        const pnl = dayTrades.reduce((sum, t)=>sum + (t.profitLoss || 0), 0);
        const wins = dayTrades.filter((t)=>t.outcome === 'WIN').length;
        return {
            count: dayTrades.length,
            pnl,
            wins
        };
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                backgroundColor: 'var(--background)'
            }
        }, void 0, false, {
            fileName: "[project]/src/app/calendar/page.tsx",
            lineNumber: 94,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            backgroundColor: 'var(--background)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '32px 16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '32px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    marginBottom: '8px',
                                    margin: 0
                                },
                                children: "Trading Calendar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/calendar/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)',
                                    margin: 0
                                },
                                children: "View your trades by day"
                            }, void 0, false, {
                                fileName: "[project]/src/app/calendar/page.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/calendar/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '12px',
                                    padding: '20px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: '20px',
                                            gap: '12px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: 'var(--text-primary)',
                                                    margin: 0
                                                },
                                                children: currentMonth.toLocaleString('default', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)),
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '6px',
                                                            border: '1px solid var(--card-border)',
                                                            backgroundColor: 'transparent',
                                                            color: 'var(--text-primary)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            e.currentTarget.style.borderColor = 'var(--purple-base)';
                                                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.borderColor = 'var(--card-border)';
                                                            e.currentTarget.style.boxShadow = 'none';
                                                        },
                                                        "aria-label": "Previous month",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiChevronLeft"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/calendar/page.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentMonth(new Date()),
                                                        style: {
                                                            background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
                                                            color: 'white',
                                                            padding: '6px 12px',
                                                            borderRadius: '6px',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontWeight: '600',
                                                            fontSize: '12px',
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = 'none';
                                                        },
                                                        children: "Today"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)),
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '6px',
                                                            border: '1px solid var(--card-border)',
                                                            backgroundColor: 'transparent',
                                                            color: 'var(--text-primary)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            e.currentTarget.style.borderColor = 'var(--purple-base)';
                                                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.borderColor = 'var(--card-border)';
                                                            e.currentTarget.style.boxShadow = 'none';
                                                        },
                                                        "aria-label": "Next month",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiChevronRight"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/calendar/page.tsx",
                                                            lineNumber: 139,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(7, 1fr)',
                                            gap: '4px',
                                            marginBottom: '12px'
                                        },
                                        children: [
                                            'Sun',
                                            'Mon',
                                            'Tue',
                                            'Wed',
                                            'Thu',
                                            'Fri',
                                            'Sat'
                                        ].map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'center',
                                                    fontWeight: '600',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '11px',
                                                    padding: '6px'
                                                },
                                                children: day
                                            }, day, false, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(7, 1fr)',
                                            gap: '4px'
                                        },
                                        children: calendarDays.map((day, idx)=>{
                                            if (day === null) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, `empty-${idx}`, false, {
                                                    fileName: "[project]/src/app/calendar/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 26
                                                }, this);
                                            }
                                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
                                            const stats = getDayStats(day);
                                            const isSelected = selectedDate === date;
                                            let bgColor = 'transparent';
                                            let textColor = 'var(--text-secondary)';
                                            let borderColor = 'var(--card-border)';
                                            if (isSelected) {
                                                bgColor = 'var(--purple-base)';
                                                textColor = 'white';
                                                borderColor = 'var(--purple-base)';
                                            } else if (stats.count > 0) {
                                                if (stats.pnl >= 0) {
                                                    bgColor = 'rgba(34, 197, 94, 0.1)';
                                                    textColor = '#22c55e';
                                                    borderColor = 'rgba(34, 197, 94, 0.3)';
                                                } else {
                                                    bgColor = 'rgba(239, 68, 68, 0.1)';
                                                    textColor = '#ef4444';
                                                    borderColor = 'rgba(239, 68, 68, 0.3)';
                                                }
                                            } else {
                                                bgColor = 'var(--panel-muted)';
                                                textColor = 'var(--text-secondary)';
                                                borderColor = 'transparent';
                                            }
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedDate(isSelected ? null : date),
                                                style: {
                                                    aspectRatio: '1',
                                                    padding: '6px',
                                                    borderRadius: '6px',
                                                    border: `1px solid ${borderColor}`,
                                                    backgroundColor: bgColor,
                                                    color: textColor,
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    transition: 'all 0.2s ease',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minHeight: '48px'
                                                },
                                                onMouseEnter: (e)=>{
                                                    if (!isSelected && stats.count === 0) {
                                                        e.currentTarget.style.borderColor = 'var(--purple-base)';
                                                    }
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.borderColor = borderColor;
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: day
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 21
                                                    }, this),
                                                    stats.count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '9px',
                                                            marginTop: '2px'
                                                        },
                                                        children: [
                                                            stats.count,
                                                            " ",
                                                            stats.count === 1 ? 'T' : 'Ts'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, day, true, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '20px',
                                            paddingTop: '16px',
                                            borderTop: '1px solid var(--card-border)',
                                            display: 'flex',
                                            gap: '16px',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '12px',
                                                            height: '12px',
                                                            backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                                            border: '1px solid rgba(34, 197, 94, 0.4)',
                                                            borderRadius: '4px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: 'var(--text-secondary)'
                                                        },
                                                        children: "Winning Day"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 231,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '12px',
                                                            height: '12px',
                                                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                                            border: '1px solid rgba(239, 68, 68, 0.4)',
                                                            borderRadius: '4px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: 'var(--text-secondary)'
                                                        },
                                                        children: "Losing Day"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '12px',
                                                            height: '12px',
                                                            backgroundColor: 'var(--panel-muted)',
                                                            border: '1px solid var(--card-border)',
                                                            borderRadius: '4px'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: 'var(--text-secondary)'
                                                        },
                                                        children: "No Trades"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/calendar/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    maxHeight: 'fit-content'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)',
                                            marginBottom: '16px',
                                            margin: 0
                                        },
                                        children: selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString() : 'Select a date'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    selectedDateTrades.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '12px'
                                        },
                                        children: selectedDateTrades.map((trade)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    backgroundColor: 'var(--panel-muted)',
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    borderLeft: `3px solid ${trade.profitLoss && trade.profitLoss >= 0 ? '#22c55e' : '#ef4444'}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            marginBottom: '8px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontWeight: '600',
                                                                    color: 'var(--text-primary)',
                                                                    fontSize: '13px'
                                                                },
                                                                children: trade.pair
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '11px',
                                                                    fontWeight: '600',
                                                                    padding: '3px 8px',
                                                                    borderRadius: '4px',
                                                                    backgroundColor: trade.outcome === 'WIN' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                                    color: trade.outcome === 'WIN' ? '#22c55e' : '#ef4444'
                                                                },
                                                                children: trade.outcome || 'Open'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            fontSize: '12px',
                                                            color: 'var(--text-secondary)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: trade.direction
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: trade.profitLoss && trade.profitLoss >= 0 ? '#22c55e' : '#ef4444',
                                                                    fontWeight: '600'
                                                                },
                                                                children: trade.profitLoss !== undefined ? `${trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}` : 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/calendar/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, trade.id, true, {
                                                fileName: "[project]/src/app/calendar/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)',
                                            margin: 0
                                        },
                                        children: selectedDate ? 'No trades on this date' : 'Select a date to view trades'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/calendar/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/calendar/page.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/calendar/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/calendar/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "bottom-right"
            }, void 0, false, {
                fileName: "[project]/src/app/calendar/page.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/calendar/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(CalendarPage, "rWpzaWAjjyfWAv1xYGgC+jaZZyY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = CalendarPage;
var _c;
__turbopack_context__.k.register(_c, "CalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_calendar_page_tsx_0eab0d75._.js.map