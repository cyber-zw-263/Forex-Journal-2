module.exports = [
"[project]/src/app/insights/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsightsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function InsightsPage() {
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time value", "undefined") !== 'undefined');
    const [trades, setTrades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [insights, setInsights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mounted) return;
        const fetchTrades = async ()=>{
            try {
                setIsLoading(true);
                setError(null);
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
                    setError('Failed to load trades data');
                    setTrades([]);
                    return;
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    console.warn('Unexpected trades payload in insights page', data);
                    setError('Invalid trades data format');
                    setTrades([]);
                    return;
                }
                setTrades(data);
            } catch (error) {
                console.error('Error fetching trades:', error);
                setError('An error occurred while loading trades');
            } finally{
                setIsLoading(false);
            }
        };
        fetchTrades();
    }, [
        mounted
    ]);
    // Generate AI insights
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (trades.length === 0) return;
        const generatedInsights = [];
        // Best performing pairs
        const pairStats = {};
        trades.forEach((trade)=>{
            if (!pairStats[trade.pair]) {
                pairStats[trade.pair] = {
                    wins: 0,
                    losses: 0,
                    pnl: 0
                };
            }
            if (trade.outcome === 'WIN') pairStats[trade.pair].wins++;
            if (trade.outcome === 'LOSS') pairStats[trade.pair].losses++;
            pairStats[trade.pair].pnl += trade.profitLoss || 0;
        });
        const bestPair = Object.entries(pairStats).sort((a, b)=>b[1].wins - a[1].wins)[0];
        if (bestPair) {
            generatedInsights.push({
                type: 'strength',
                title: `${bestPair[0]} is your best pair`,
                description: `You have a ${Math.round(bestPair[1].wins / (bestPair[1].wins + bestPair[1].losses) * 100)}% win rate on ${bestPair[0]}. Consider trading it more often.`,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiTrendingUp"],
                color: 'text-green-600 dark:text-green-400'
            });
        }
        // Emotional state analysis
        const emotionalTrades = trades.filter((t)=>t.emotionalState);
        if (emotionalTrades.length > 0) {
            const emotionalStats = {};
            emotionalTrades.forEach((trade)=>{
                if (!emotionalStats[trade.emotionalState || '']) {
                    emotionalStats[trade.emotionalState || ''] = {
                        wins: 0,
                        losses: 0
                    };
                }
                if (trade.outcome === 'WIN') emotionalStats[trade.emotionalState || ''].wins++;
                else emotionalStats[trade.emotionalState || ''].losses++;
            });
            const bestState = Object.entries(emotionalStats).sort((a, b)=>b[1].wins - a[1].wins)[0];
            if (bestState) {
                generatedInsights.push({
                    type: 'pattern',
                    title: `You trade best when ${bestState[0]}`,
                    description: `${bestState[1].wins} wins when ${bestState[0]} vs ${bestState[1].losses} losses. Remember this state for future trades.`,
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiZap"],
                    color: 'text-blue-600 dark:text-blue-400'
                });
            }
        }
        // Win rate by direction
        const longs = trades.filter((t)=>t.direction === 'LONG');
        const shorts = trades.filter((t)=>t.direction === 'SHORT');
        const longWinRate = longs.length > 0 ? longs.filter((t)=>t.outcome === 'WIN').length / longs.length * 100 : 0;
        const shortWinRate = shorts.length > 0 ? shorts.filter((t)=>t.outcome === 'WIN').length / shorts.length * 100 : 0;
        if (longWinRate > shortWinRate && longWinRate > 40) {
            generatedInsights.push({
                type: 'improvement',
                title: 'You are better at LONG trades',
                description: `Long win rate: ${Math.round(longWinRate)}% vs Short: ${Math.round(shortWinRate)}%. Focus more on long setups.`,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiTarget"],
                color: 'text-green-600 dark:text-green-400'
            });
        }
        // Common mistakes warning
        const allMistakes = trades.filter((t)=>t.mistakes).flatMap((t)=>{
            try {
                return t.mistakes ? JSON.parse(t.mistakes) : [];
            } catch  {
                return [];
            }
        });
        if (allMistakes.length > 0) {
            const mistakeCount = {};
            allMistakes.forEach((m)=>{
                mistakeCount[m] = (mistakeCount[m] || 0) + 1;
            });
            const topMistake = Object.entries(mistakeCount).sort((a, b)=>b[1] - a[1])[0];
            if (topMistake && topMistake[1] > 1) {
                generatedInsights.push({
                    type: 'warning',
                    title: `Repeated mistake: ${topMistake[0]}`,
                    description: `You've made this mistake ${topMistake[1]} times. Create a checklist to prevent this.`,
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiAlertCircle"],
                    color: 'text-orange-600 dark:text-orange-400'
                });
            }
        }
        // Time-based analysis
        const morningTrades = trades.filter((t)=>{
            const hour = new Date(t.entryTime).getHours();
            return hour >= 8 && hour < 12;
        });
        if (morningTrades.length > 5) {
            const morningWins = morningTrades.filter((t)=>t.outcome === 'WIN').length;
            const morningWinRate = morningWins / morningTrades.length * 100;
            if (morningWinRate > 60) {
                generatedInsights.push({
                    type: 'pattern',
                    title: 'You trade best in the morning',
                    description: `Morning (8am-12pm) win rate: ${Math.round(morningWinRate)}%. Schedule more trades during this time.`,
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiTrendingUp"],
                    color: 'text-yellow-600 dark:text-yellow-400'
                });
            }
        }
        setInsights(generatedInsights);
    }, [
        trades
    ]);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                backgroundColor: 'var(--background)'
            }
        }, void 0, false, {
            fileName: "[project]/src/app/insights/page.tsx",
            lineNumber: 202,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            backgroundColor: 'var(--background)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '32px 16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '32px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    marginBottom: '8px'
                                },
                                children: "AI-Powered Insights"
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)'
                                },
                                children: "Get personalized trading improvements based on your data"
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/insights/page.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '24px',
                            padding: '16px',
                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                            border: '1px solid rgba(220, 38, 38, 0.3)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'var(--loss-color)'
                        },
                        role: "alert",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiAlertCircle"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '14px'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/insights/page.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: 'var(--text-secondary)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '14px',
                                    marginBottom: '16px'
                                },
                                children: "Analyzing your trading data..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    border: '2px solid var(--purple-base)',
                                    borderTop: '2px solid transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/insights/page.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this) : insights.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '16px',
                                marginBottom: '32px'
                            },
                            children: insights.map((insight, idx)=>{
                                const Icon = insight.icon;
                                const getBgColor = ()=>{
                                    switch(insight.type){
                                        case 'warning':
                                            return {
                                                bg: 'rgba(217, 119, 6, 0.1)',
                                                border: 'rgba(217, 119, 6, 0.3)'
                                            };
                                        case 'strength':
                                            return {
                                                bg: 'rgba(34, 197, 94, 0.1)',
                                                border: 'rgba(34, 197, 94, 0.3)'
                                            };
                                        case 'improvement':
                                            return {
                                                bg: 'rgba(59, 130, 246, 0.1)',
                                                border: 'rgba(59, 130, 246, 0.3)'
                                            };
                                        default:
                                            return {
                                                bg: 'rgba(139, 92, 246, 0.1)',
                                                border: 'rgba(139, 92, 246, 0.3)'
                                            };
                                    }
                                };
                                const colors = getBgColor();
                                const getIconColor = ()=>{
                                    switch(insight.type){
                                        case 'warning':
                                            return '#d97706';
                                        case 'strength':
                                            return '#22c55e';
                                        case 'improvement':
                                            return '#3b82f6';
                                        default:
                                            return '#a855f7';
                                    }
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: colors.bg,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: '12px',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        backgroundColor: 'var(--card-bg)',
                                                        padding: '8px',
                                                        borderRadius: '8px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        size: 20,
                                                        style: {
                                                            color: getIconColor()
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/insights/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/insights/page.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: '600',
                                                        color: 'var(--text-primary)',
                                                        margin: 0
                                                    },
                                                    children: insight.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/insights/page.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/insights/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--text-secondary)',
                                                margin: 0
                                            },
                                            children: insight.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/insights/page.tsx",
                                            lineNumber: 314,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/src/app/insights/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/insights/page.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this)
                    }, void 0, false) : trades.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '60px 20px',
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            color: 'var(--text-secondary)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '16px',
                                    marginBottom: '8px',
                                    margin: 0
                                },
                                children: "No trades available"
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '13px',
                                    margin: 0
                                },
                                children: "Add some trades to your journal to get AI-powered insights"
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/insights/page.tsx",
                        lineNumber: 323,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '60px 20px',
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            color: 'var(--text-secondary)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '16px',
                                margin: 0
                            },
                            children: "Not enough data for insights yet"
                        }, void 0, false, {
                            fileName: "[project]/src/app/insights/page.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/insights/page.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    trades.length > 0 && insights.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '32px',
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            padding: '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: 'var(--text-primary)',
                                    marginBottom: '20px',
                                    margin: 0
                                },
                                children: "Trading Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: 'var(--panel-muted)',
                                            padding: '16px',
                                            borderRadius: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: 'var(--text-secondary)',
                                                    marginBottom: '8px',
                                                    margin: 0
                                                },
                                                children: "Total Trades"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    color: 'var(--text-primary)',
                                                    margin: 0
                                                },
                                                children: trades.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 367,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/insights/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: 'var(--panel-muted)',
                                            padding: '16px',
                                            borderRadius: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: 'var(--text-secondary)',
                                                    marginBottom: '8px',
                                                    margin: 0
                                                },
                                                children: "Win Rate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 370,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    color: '#22c55e',
                                                    margin: 0
                                                },
                                                children: [
                                                    trades.length > 0 ? Math.round(trades.filter((t)=>t.outcome === 'WIN').length / trades.length * 100) : 0,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/insights/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: 'var(--panel-muted)',
                                            padding: '16px',
                                            borderRadius: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: 'var(--text-secondary)',
                                                    marginBottom: '8px',
                                                    margin: 0
                                                },
                                                children: "Total P&L"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    color: trades.reduce((sum, t)=>sum + (t.profitLoss || 0), 0) >= 0 ? '#22c55e' : '#ef4444',
                                                    margin: 0
                                                },
                                                children: (trades.reduce((sum, t)=>sum + (t.profitLoss || 0), 0) || 0).toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/insights/page.tsx",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: 'var(--panel-muted)',
                                            padding: '16px',
                                            borderRadius: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: 'var(--text-secondary)',
                                                    marginBottom: '8px',
                                                    margin: 0
                                                },
                                                children: "Avg Quality"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 389,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    color: '#fbbf24',
                                                    margin: 0
                                                },
                                                children: trades.filter((t)=>t.setupQuality).length > 0 ? (trades.filter((t)=>t.setupQuality).reduce((sum, t)=>sum + (t.setupQuality || 0), 0) / trades.filter((t)=>t.setupQuality).length).toFixed(1) : 'N/A'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/insights/page.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/insights/page.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/insights/page.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/insights/page.tsx",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/insights/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "bottom-right"
            }, void 0, false, {
                fileName: "[project]/src/app/insights/page.tsx",
                lineNumber: 406,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/insights/page.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_insights_page_tsx_06df0699._.js.map