// Convierte cualquier formato de color a RGBA con alpha
export function toRGBA(color, alpha = 0.25) {
    // Si ya viene en rgba(), solo cambiamos la opacidad
    if (color.startsWith("rgba")) {
        return color.replace(/rgba\(([^)]+)\)/, (_, values) => {
            const parts = values.split(",").slice(0, 3).join(",");
            return `rgba(${parts}, ${alpha})`;
        });
    }

    // Si viene en rgb()
    if (color.startsWith("rgb")) {
        const vals = color.match(/\d+/g).map(Number);
        return `rgba(${vals[0]}, ${vals[1]}, ${vals[2]}, ${alpha})`;
    }

    // Si viene en hex (#rrggbb o #rgb)
    if (color.startsWith("#")) {
        let hex = color.slice(1);

        // hex corto (#abc → #aabbcc)
        if (hex.length === 3) {
            hex = hex.split("").map((c) => c + c).join("");
        }

        const intVal = parseInt(hex, 16);
        const r = (intVal >> 16) & 255;
        const g = (intVal >> 8) & 255;
        const b = intVal & 255;

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Si viene en nombre CSS → lo convertimos con un trick usando un div temporal
    const temp = document.createElement("div");
    temp.style.color = color;
    document.body.appendChild(temp);

    const rgb = getComputedStyle(temp).color; // "rgb(r, g, b)"
    document.body.removeChild(temp);

    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
