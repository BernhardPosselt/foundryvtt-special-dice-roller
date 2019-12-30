export function escapeHtml(value: string): string {
    const text = document.createTextNode(value);
    const p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
}
