"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, TrendingUp } from "lucide-react";

const StockSearchInput = ({
    alphaVantageData,
    isLoading,
    onSelect,
    selectedSymbol,
    onClear
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (selectedSymbol) {
            setSearchTerm(selectedSymbol);
        }
    }, [selectedSymbol]);

    useEffect(() => {
        if (searchTerm.length > 0 && alphaVantageData.length > 0) {
            const filtered = alphaVantageData
                .filter((item) => {
                    const symbol = item.symbol?.toLowerCase() || "";
                    const name = item.name?.toLowerCase() || "";
                    const search = searchTerm.toLowerCase();
                    return symbol.includes(search) || name.includes(search);
                })
                .slice(0, 50); // Limitar a 50 resultados para mejor rendimiento

            setFilteredResults(filtered);
            setIsOpen(true);
        } else {
            setFilteredResults([]);
            setIsOpen(false);
        }
    }, [searchTerm, alphaVantageData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setSearchTerm(item.symbol);
        setFilteredResults([]);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onSelect(item);
    };

    const handleClear = () => {
        setSearchTerm("");
        setFilteredResults([]);
        setIsOpen(false);
        if (onClear) onClear();
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (!isOpen || filteredResults.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredResults.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                break;
            case "Enter":
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredResults.length) {
                    handleSelect(filteredResults[highlightedIndex]);
                }
                break;
            case "Escape":
                setIsOpen(false);
                break;
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar símbolo o nombre (ej: AAPL, Tesla...)"
                    className="h-12 w-full pl-10 pr-10 bg-gray-50 dark:bg-slate-500 border border-gray-200 dark:border-slate-600 focus:outline-none focus:bg-white dark:focus:bg-slate-600 focus:border-slate-900 dark:focus:border-slate-400 transition-colors rounded-lg shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-900"
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 animate-spin" />
                )}
                {searchTerm && !isLoading && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isOpen && filteredResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    {filteredResults.map((item, index) => (
                        <button
                            key={`${item.symbol}-${index}`}
                            type="button"
                            onClick={() => handleSelect(item)}
                            className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border-b border-slate-100 dark:border-slate-600 last:border-b-0 ${index === highlightedIndex
                                    ? "bg-slate-100 dark:bg-slate-600"
                                    : ""
                                }`}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                                        <span className="font-bold text-slate-900 dark:text-slate-100">
                                            {item.symbol}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 truncate mt-1">
                                        {item.name}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    {item.assetType && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200">
                                            {item.assetType}
                                        </span>
                                    )}
                                    {item.exchange && (
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {item.exchange}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && searchTerm && filteredResults.length === 0 && !isLoading && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl p-4">
                    <p className="text-center text-slate-500 dark:text-slate-400">
                        No se encontraron resultados para "{searchTerm}"
                    </p>
                </div>
            )}
        </div>
    );
};

export default StockSearchInput;
