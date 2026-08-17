
export const card = (imageSource: string, country: string, population: number, region: string, capital: string): HTMLDivElement => {
    const container = document.createElement('div') as HTMLDivElement;
    container.innerHTML=`
        <div class="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src=\`${imageSource}\`
                    alt=\`${country}' flag\` />
            </figure>
            <div class="card-body">
                <h2 class="card-title">\`${country}\`</h2>
                <p>Population: \`${population}\`</p>
                <p>Region: \`${region}\`</p>
                <p>Capital: \`${capital}\`</p>
                <div class="card-actions justify-end">
                </div>
            </div>
        </div>`
    return container;
}