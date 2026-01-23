"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Plus, Minus, Home, ChevronLeft } from "lucide-react";

// --- Types & Data ---

type SectionData = {
    id: string;
    d: string;
    label: string;
    labelX: number | string;
    labelY: number | string;
};

// Extracted Section Data
const SECTIONS: SectionData[] = [
    // NORTH
    { id: "N113", d: "M472 70 h56 v70 h-56 z", label: "NORTH 113", labelX: 500, labelY: 100 },
    { id: "N112", d: "M414 70 h56 v70 h-56 z", label: "NORTH 112", labelX: 440, labelY: 100 },
    { id: "N114", d: "M530 70 h56 v70 h-56 z", label: "NORTH 114", labelX: 560, labelY: 100 },
    { id: "N111", d: "M355 85 L412 70 L412 140 L370 140 Z", label: "NORTH 111", labelX: 380, labelY: 110 },
    { id: "N110", d: "M305 115 L353 85 L368 140 L320 160 Z", label: "NORTH 110", labelX: 330, labelY: 140 },
    { id: "N109", d: "M265 155 L303 116 L318 162 L275 190 Z", label: "NORTH 109", labelX: 290, labelY: 180 },
    { id: "N108", d: "M225 180 L263 156 L273 192 L235 220 Z", label: "NORTH 108", labelX: 250, labelY: 210 },
    { id: "N115", d: "M588 70 L645 85 L630 140 L588 140 Z", label: "NORTH 115", labelX: 620, labelY: 110 },
    { id: "N116", d: "M647 85 L695 115 L680 160 L632 140 Z", label: "NORTH 116", labelX: 670, labelY: 140 },
    { id: "N117", d: "M697 116 L735 155 L725 190 L682 162 Z", label: "NORTH 117", labelX: 710, labelY: 180 },
    { id: "N118", d: "M737 156 L775 180 L765 220 L727 192 Z", label: "NORTH 118", labelX: 750, labelY: 210 },

    // WEST
    { id: "W107", d: "M170 250 h120 v60 h-120 z", label: "WEST 107", labelX: 230, labelY: 280 },
    { id: "W106", d: "M170 315 h120 v60 h-120 z", label: "WEST 106", labelX: 230, labelY: 345 },
    { id: "W105", d: "M170 380 h120 v60 h-120 z", label: "WEST 105", labelX: 230, labelY: 410 },
    { id: "W104", d: "M170 445 h120 v60 h-120 z", label: "WEST 104", labelX: 230, labelY: 475 },
    { id: "W103", d: "M170 510 h120 v60 h-120 z", label: "WEST 103", labelX: 230, labelY: 540 },
    { id: "W102", d: "M170 575 h120 v60 h-120 z", label: "WEST 102", labelX: 230, labelY: 605 },
    { id: "W101", d: "M170 640 h120 v60 h-120 z", label: "WEST 101", labelX: 230, labelY: 670 },

    // EAST
    { id: "E119", d: "M710 250 h120 v60 h-120 z", label: "EAST 119", labelX: 770, labelY: 280 },
    { id: "E120", d: "M710 315 h120 v60 h-120 z", label: "EAST 120", labelX: 770, labelY: 345 },
    { id: "E121", d: "M710 380 h120 v60 h-120 z", label: "EAST 121", labelX: 770, labelY: 410 },
    { id: "E122", d: "M710 445 h120 v60 h-120 z", label: "EAST 122", labelX: 770, labelY: 475 },
    { id: "E123", d: "M710 510 h120 v60 h-120 z", label: "EAST 123", labelX: 770, labelY: 540 },
    { id: "E124", d: "M710 575 h120 v60 h-120 z", label: "EAST 124", labelX: 770, labelY: 605 },
    { id: "E125", d: "M710 640 h120 v60 h-120 z", label: "EAST 125", labelX: 770, labelY: 670 },

    // SOUTH
    { id: "S130", d: "M480 720 h40 v90 h-40 z", label: "SOUTH 130", labelX: 500, labelY: 760 },
    { id: "S129", d: "M438 720 h40 v90 h-40 z", label: "SOUTH 129", labelX: 458, labelY: 760 },
    { id: "S128", d: "M396 720 h40 v90 h-40 z", label: "SOUTH 128", labelX: 415, labelY: 760 },
    { id: "S131", d: "M522 720 h40 v90 h-40 z", label: "SOUTH 131", labelX: 542, labelY: 760 },
    { id: "S132", d: "M564 720 h40 v90 h-40 z", label: "SOUTH 132", labelX: 584, labelY: 760 },

    // WC (Wheelchair Accessible) Sections
    { id: "WC107", d: "M292 250 h30 v90 h-30 z", label: "107 WC", labelX: 307, labelY: 295 },
    { id: "WC102", d: "M292 575 h30 v125 h-30 z", label: "102 WC", labelX: 307, labelY: 637 },
    { id: "WC119", d: "M678 250 h30 v90 h-30 z", label: "119 WC", labelX: 693, labelY: 295 },
    { id: "WC124", d: "M678 575 h30 v125 h-30 z", label: "124 WC", labelX: 693, labelY: 637 },
];

// Helper: Parse SVG path 'd' to polygon vertices (Simplified for this dataset)
const parsePathToPolygon = (d: string) => {
    const commands = d.match(/([a-zA-Z])|([-+]?[0-9]*\.?[0-9]+)/g) || [];
    const vertices: { x: number, y: number }[] = [];
    let x = 0, y = 0;
    let i = 0;
    if (commands.length === 0) return [];

    while (i < commands.length) {
        const token = commands[i];
        if (isNaN(Number(token))) {
            const cmd = token;
            i++;
            switch (cmd) {
                case 'M': x = Number(commands[i++]); y = Number(commands[i++]); vertices.push({ x, y }); break;
                case 'L': x = Number(commands[i++]); y = Number(commands[i++]); vertices.push({ x, y }); break;
                case 'h': x += Number(commands[i++]); vertices.push({ x, y }); break;
                case 'v': y += Number(commands[i++]); vertices.push({ x, y }); break;
                default: break;
            }
        } else { i++; }
    }
    return vertices;
};

const isPointInPolygon = (pt: { x: number, y: number }, vs: { x: number, y: number }[]) => {
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i].x, yi = vs[i].y;
        const xj = vs[j].x, yj = vs[j].y;
        const intersect = ((yi > pt.y) !== (yj > pt.y)) && (pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

// --- Camera System ---
// ViewBox dimensions (constants for the SVG coordinate system)
const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 850;

type BoundingBox = {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
};

// Calculate precise bounding box from polygon vertices
const getPolygonBounds = (polygon: { x: number; y: number }[]): BoundingBox | null => {
    if (polygon.length === 0) return null;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const p of polygon) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }

    return {
        minX,
        maxX,
        minY,
        maxY,
        width: maxX - minX,
        height: maxY - minY,
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
    };
};

// Calculate optimal camera position and zoom for a section
// This ensures the section is perfectly centered with appropriate framing
const calculateCameraForSection = (section: SectionData): { x: number; y: number; scale: number } => {
    const polygon = parsePathToPolygon(section.d);

    if (polygon.length < 3) {
        // Fallback to label position if polygon parsing fails
        return {
            x: (Number(section.labelX) / VIEWBOX_WIDTH) * 100,
            y: (Number(section.labelY) / VIEWBOX_HEIGHT) * 100,
            scale: 10,
        };
    }

    const bounds = getPolygonBounds(polygon);
    if (!bounds) {
        return {
            x: 50,
            y: 50,
            scale: 10,
        };
    }

    // Calculate optimal scale to fit section with comfortable padding
    // Target: section fills ~50-60% of visible viewport (20-25% padding on each side)
    const paddingFactor = 0.55; // Section fills 55% of viewport
    const scaleX = (VIEWBOX_WIDTH * paddingFactor) / bounds.width;
    const scaleY = (VIEWBOX_HEIGHT * paddingFactor) / bounds.height;

    // Use the smaller scale to ensure section fits in both dimensions
    // Clamp to reasonable zoom range (min 5x for context, max 14x for detail)
    const optimalScale = Math.min(scaleX, scaleY);
    const scale = Math.max(5, Math.min(optimalScale, 14));

    // Calculate focus point using bounding box center (NOT polygon centroid)
    // This ensures perfect centering for all shapes including trapezoids
    const targetX = (bounds.centerX / VIEWBOX_WIDTH) * 100;
    const targetY = (bounds.centerY / VIEWBOX_HEIGHT) * 100;

    return { x: targetX, y: targetY, scale };
};

// Deterministic random generator for seat status
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export default function InteractiveSeatMap({
    onSectionSelect,
    onSeatClick,
    maxPrice,
    sectionAvailability = {}
}: {
    onSectionSelect?: (section: string | null) => void,
    onSeatClick?: (seat: any) => void,
    maxPrice?: number,
    sectionAvailability?: Record<string, number>
}) {
    const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
    const [overlayData, setOverlayData] = useState<{ x: number, y: number, section: string, row: number, seat: number, price: number } | null>(null);
    const [view, setView] = useState({ x: 50, y: 50, scale: 1 });

    // Dragging State
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    const handleSelectSection = (section: SectionData) => {
        if (selectedSection?.id === section.id) {
            handleReset();
            return;
        }

        setSelectedSection(section);
        if (onSectionSelect) onSectionSelect(section.id);

        // Use the camera calculation system for perfect positioning
        // This computes optimal zoom and bounding-box-centered focus point
        const camera = calculateCameraForSection(section);
        setView(camera);
    };

    const handleReset = () => {
        setSelectedSection(null);
        if (onSectionSelect) onSectionSelect(null);
        setView({ x: 50, y: 50, scale: 1 });
    };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent text selection
        setIsDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        setLastPos({ x: e.clientX, y: e.clientY });

        const { clientWidth, clientHeight } = containerRef.current;

        // Calculate percentage change
        // We move the focus point opposite to the drag direction
        // The amount is scaled by the zoom level (dragging 100px at 5x zoom covers less "map" than at 1x)
        const percentX = (dx / clientWidth) * 100 / view.scale;
        const percentY = (dy / clientHeight) * 100 / view.scale;

        setView(prev => ({
            ...prev,
            x: Math.max(0, Math.min(100, prev.x - percentX)),
            y: Math.max(0, Math.min(100, prev.y - percentY))
        }));
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    // --- Generate "In-Shape" Seats ---
    const seatGrid = useMemo(() => {
        if (!selectedSection) return null;

        // 1. Get Polygon Vertices
        const polygon = parsePathToPolygon(selectedSection.d);
        if (polygon.length < 3) return null;

        // Use bounding box center for consistent seat generation
        const bounds = getPolygonBounds(polygon);
        if (!bounds) return null;

        const cw = 150;
        const ch = 150;
        const gap = 3.5;
        const radius = 1.2;
        const cx = bounds.centerX;
        const cy = bounds.centerY;

        const currentAvailability = sectionAvailability[selectedSection.id] ?? 1.0;

        const seats = [];
        let count = 0;

        // 2. Scan Grid
        for (let x = cx - cw; x <= cx + cw; x += gap) {
            for (let y = cy - ch; y <= cy + ch; y += gap) {
                // 3. Strict Containment Check
                const center = { x, y };

                // Fast check center first
                if (isPointInPolygon(center, polygon)) {
                    const padding = radius + 0.8;
                    // Check 4 edges
                    if (
                        isPointInPolygon({ x: x + padding, y }, polygon) &&
                        isPointInPolygon({ x: x - padding, y }, polygon) &&
                        isPointInPolygon({ x, y: y + padding }, polygon) &&
                        isPointInPolygon({ x, y: y - padding }, polygon)
                    ) {
                        // Assign a stable mock price based on section and position
                        const basePrice = selectedSection.id.startsWith('WC') ? 400 : selectedSection.id.startsWith('W') ? 500 : selectedSection.id.startsWith('E') ? 450 : 350;
                        const seatPrice = basePrice + (y / 10) + (x / 20);

                        // Deterministic availability check
                        // Each seat has a static 'rank' (0.0 to 1.0). If rank > currentAvailability, it's sold.
                        // We use a simple hash of coordinates to get rank.
                        const seatHash = seededRandom(x * y + count);
                        const isSold = seatHash > currentAvailability;

                        const isBlue = !isSold; // Blue if available (and resale, simplified here)
                        const isSelectable = isBlue && (maxPrice ? seatPrice <= maxPrice : true);

                        seats.push({
                            x, y,
                            id: `${selectedSection.id}-seat-${count++}`,
                            status: isSelectable ? 'resale' : 'sold',
                            row: Math.floor((y - (cy - ch)) / gap),
                            number: Math.floor((x - (cx - cw)) / gap) % 20 + 1, // Mock seat number
                            price: seatPrice
                        });
                    }
                }
            }
        }
        return seats;
    }, [selectedSection, maxPrice, sectionAvailability]);

    return (
        <div
            className="relative w-full h-full border border-gray-200 rounded-sm overflow-hidden shadow-sm flex items-center justify-center bg-gray-50 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
                setIsDragging(false);
                setOverlayData(null);
            }}
        >
            {/* Seat Info Overlay */}
            {overlayData && (
                <div
                    className="absolute z-50 bg-white shadow-xl rounded-sm w-[200px] pointer-events-none animate-in fade-in zoom-in-95 duration-200"
                    style={{
                        left: overlayData.x + 20,
                        top: overlayData.y - 100,
                    }}
                >
                    <div className="h-1 w-full bg-[#026cdf] rounded-t-sm"></div>
                    <div className="p-4">
                        <div className="flex justify-between text-[10px] items-center text-gray-500 font-bold mb-1 tracking-wider">
                            <span className="flex-1 text-center border-r border-gray-200">SEC</span>
                            <span className="flex-1 text-center border-r border-gray-200">ROW</span>
                            <span className="flex-1 text-center">SEAT</span>
                        </div>
                        <div className="flex justify-between text-lg items-center font-bold text-[#1f262d] mb-4">
                            <span className="flex-1 text-center">{overlayData.section}</span>
                            <span className="flex-1 text-center">{overlayData.row}</span>
                            <span className="flex-1 text-center">{overlayData.seat}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-3 space-y-1">
                            <p className="font-bold text-sm text-[#1f262d]">Preferred Seating</p>
                            <p className="font-bold text-sm text-[#1f262d]">CA ${overlayData.price.toFixed(2)}</p>
                            <p className="text-[10px] text-gray-400 mb-3">(CA ${(overlayData.price * 0.8).toFixed(2)} + CA ${(overlayData.price * 0.2).toFixed(2)} fees, including taxes)</p>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                            <p className="font-bold text-[10px] text-[#1f262d] mb-1">Description</p>
                            <p className="text-[10px] text-gray-500">East Grandstand</p>
                            <p className="text-[10px] text-gray-500">Reserved Seating</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 bg-white rounded-md shadow-lg border border-gray-100 p-1" onMouseDown={e => e.stopPropagation()}>
                <button
                    className="p-2 hover:bg-gray-50 text-gray-600 border-b border-gray-100 transition-colors"
                    title="Reset View"
                    onClick={handleReset}
                >
                    {selectedSection ? <ChevronLeft className="w-5 h-5 text-[#026cdf]" /> : <Home className="w-5 h-5" />}
                </button>
                <button className="p-2 hover:bg-gray-50 text-[#026cdf] border-b border-gray-100 transition-colors" onClick={() => setView(s => ({ ...s, scale: Math.min(s.scale + 1, 14) }))}>
                    <Plus className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-50 text-gray-600 transition-colors" onClick={() => setView(s => ({ ...s, scale: Math.max(s.scale - 1, 1) }))}>
                    <Minus className="w-5 h-5" />
                </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 z-20 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 text-[10px] font-bold text-gray-500 uppercase flex gap-4 tracking-wider" onMouseDown={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#e5e7eb] border border-gray-300"></div> Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#026cdf]"></div> Resale
                </div>
                {/* Added Gray for logic visualization */}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#d1d5db]"></div> Sold
                </div>
            </div>

            {/* Map Container */}
            <div
                ref={containerRef}
                className="relative"
                style={{
                    aspectRatio: '1000/850',
                    width: 'min(100%, 1000px)',
                    height: 'auto',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    transformOrigin: '0 0',
                    transform: `translate(50%, 50%) scale(${view.scale}) translate(-${view.x}%, -${view.y}%)`,
                    transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)'
                }}
            >
                <svg viewBox="0 0 1000 850" className="w-full h-full drop-shadow-xl select-none pointer-events-none">

                    {/* Define Clip Path */}
                    <defs>
                        {selectedSection && (
                            <clipPath id="selected-section-clip">
                                <path d={selectedSection.d} />
                            </clipPath>
                        )}
                    </defs>

                    {/* Background Stadium - Light Grey Octagon */}
                    <path
                        d="M300 50 L700 50 L900 250 L900 700 L700 820 L300 820 L100 700 L100 250 Z"
                        fill="#f3f4f6"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                    />

                    {/* Sections */}
                    {SECTIONS.map((section) => {
                        const isSelected = selectedSection?.id === section.id;
                        const isDimmed = selectedSection && !isSelected;

                        // Section Color Logic:
                        // If fully sold out (availability <= 0), turn gray.
                        // Else, blue.
                        const availability = sectionAvailability[section.id] ?? 1.0;
                        const isSoldOut = availability <= 0;

                        const fillColor = isSelected
                            ? "white" // White when selected (zoom in)
                            : isSoldOut
                                ? "#d1d5db" // Gray when sold out
                                : "#026cdf"; // Ticketmaster Blue otherwise

                        return (
                            <g
                                key={section.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectSection(section);
                                }}
                                className="cursor-pointer transition-opacity duration-300 pointer-events-auto group"
                                style={{ opacity: isDimmed ? 0.3 : 1 }}
                            >
                                <path
                                    d={section.d}
                                    fill={fillColor}
                                    stroke={isSelected ? "#026cdf" : "white"}
                                    strokeWidth={isSelected ? 1 : 2}
                                    className={`transition-colors duration-200 ${!isSelected ? "group-hover:opacity-80" : ""}`}
                                />

                                {!isSelected && (
                                    <text
                                        x={section.labelX}
                                        y={section.labelY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="white"
                                        fontSize="10"
                                        fontWeight="600"
                                        className="pointer-events-none select-none uppercase tracking-tight"
                                        style={{ fontFamily: 'Arial, sans-serif' }}
                                    >
                                        {section.label}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Stage & Decor */}
                    {!selectedSection && (
                        <>
                            {/* Stage - Black shape in center */}
                            <g className="pointer-events-none">
                                {/* Cross extensions - lines from circle center outward */}
                                {/* Top left */}
                                <line x1="500" y1="450" x2="380" y2="330" stroke="#1f262d" strokeWidth="20" />
                                {/* Top right */}
                                <line x1="500" y1="450" x2="620" y2="330" stroke="#1f262d" strokeWidth="20" />
                                {/* Bottom left */}
                                <line x1="500" y1="450" x2="380" y2="570" stroke="#1f262d" strokeWidth="20" />
                                {/* Bottom right */}
                                <line x1="500" y1="450" x2="620" y2="570" stroke="#1f262d" strokeWidth="20" />

                                {/* Main circle - drawn on top */}
                                <circle cx="500" cy="450" r="70" fill="#1f262d" />

                                {/* STAGE text */}
                                <text
                                    x="500"
                                    y="455"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="white"
                                    fontSize="28"
                                    fontWeight="bold"
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                >
                                    STAGE
                                </text>
                            </g>

                        </>
                    )}

                    {/* Seats - pointer-events-auto */}
                    {selectedSection && seatGrid && (
                        <g clipPath="url(#selected-section-clip)" className="pointer-events-auto">
                            {seatGrid.map((seat) => {
                                const isBlue = seat.status === 'resale';
                                const isSelected = selectedSeats.has(seat.id);

                                return (
                                    <circle
                                        key={seat.id}
                                        cx={seat.x}
                                        cy={seat.y}
                                        r={1.2}
                                        fill={isSelected ? '#1f8c2e' : (isBlue ? '#026cdf' : '#d1d5db')}
                                        className={`transition-colors duration-200 ${isBlue
                                            ? (isSelected ? 'cursor-pointer hover:fill-[#166020]' : 'cursor-pointer hover:fill-[#005fb0]')
                                            : 'cursor-default transition-colors duration-200' // Faster transition for sold out
                                            }`}
                                        onMouseEnter={(e) => {
                                            if (isSelected) {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                // Calculate relative position within the container
                                                if (containerRef.current) {
                                                    const containerRect = containerRef.current.parentElement!.getBoundingClientRect();
                                                    setOverlayData({
                                                        x: rect.right - containerRect.left,
                                                        y: rect.top - containerRect.top,
                                                        section: selectedSection.id,
                                                        row: seat.row || 12,
                                                        seat: seat.number || 31,
                                                        price: seat.price || 218.13
                                                    });
                                                }
                                            }
                                        }}
                                        onMouseLeave={() => setOverlayData(null)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isBlue) return;

                                            // Determine action based on current state in closure
                                            // This avoids using e.currentTarget inside the state setter callback
                                            if (isSelected) {
                                                // Deselect
                                                setSelectedSeats(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.delete(seat.id);
                                                    return newSet;
                                                });
                                                setOverlayData(null);
                                                if (onSeatClick) onSeatClick(null);
                                            } else {
                                                // Select
                                                const rect = e.currentTarget.getBoundingClientRect();

                                                setSelectedSeats(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.add(seat.id);
                                                    return newSet;
                                                });

                                                // Show overlay
                                                if (containerRef.current) {
                                                    const containerRect = containerRef.current.parentElement!.getBoundingClientRect();
                                                    setOverlayData({
                                                        x: rect.right - containerRect.left,
                                                        y: rect.top - containerRect.top,
                                                        section: selectedSection.id,
                                                        row: seat.row || 12,
                                                        seat: seat.number || 31,
                                                        price: seat.price || 218.13
                                                    });
                                                }

                                                // Trigger external selection (TicketList summary)
                                                if (onSeatClick) {
                                                    const price = seat.price || 218.13;
                                                    onSeatClick({
                                                        id: seat.id,
                                                        sec: selectedSection.id,
                                                        row: (seat.row || 12).toString(),
                                                        price: price,
                                                        fee: price * 0.2,
                                                        type: seat.status === 'resale' ? 'Resale Ticket' : 'Standard Ticket'
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                );
                            })}
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
}
