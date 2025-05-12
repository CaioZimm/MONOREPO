import { useFavorite } from "../../hooks/useFavorite"
import { useEffect, useState } from "react"
import { getCryptos } from "../../services/coinGeckoService"
import { FaStar } from "react-icons/fa"

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
}

interface Favorite {
    id: number;
    userId: string;
    cryptoName: string;
}

const Favorite = () => {
    const [ favorites, setFavorites] = useState<Favorite[]>([]);
    const [ cryptos, setCryptos ] = useState<Crypto[]>([])

    const { getFavorite, listFavorite } = useFavorite();

    useEffect(() => {
        const fetchFavorites = async () => {
            const data = await listFavorite();
            setFavorites(data)

            const all = await getCryptos()
            setCryptos(all)
        }

        fetchFavorites();
    }, [])

    const favoriteNames = favorites.map((fav) => fav.cryptoName);
    const filtered = cryptos.filter((c) => favoriteNames.includes(c.id));

    return(
        <div className="p-6 h-full overflow-y-auto">

            <h1 className="text-2xl font-bold mb-4">Minhas criptomoedas favoritas</h1>

            {filtered.length === 0 ? (
                <p>Você ainda não favoritou nenhuma criptomoeda.</p>
            ) : (
                <ul className="space-y-3">
                {filtered.map((crypto) => (
                    <li
                    key={crypto.id}
                    className="flex justify-between items-center border p-4 rounded-md shadow-sm"
                    >
                    <div className="flex items-center gap-3">
                        <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                        <span>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                        </span>
                    </div>

                    <button
                        onClick={async () => {
                        await getFavorite(crypto.id);
                        setFavorites(await listFavorite());
                        }}
                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        title="Desfavoritar"
                    >
                        <FaStar />
                    </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}

export default Favorite