import { getCryptos } from "../../../services/coinGeckoService";
import { Listbox, Transition } from "@headlessui/react";
import { useFavorite } from "../../../hooks/useFavorite";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface ListProps {
    selected: string;
    setSelected: (value: string) => void;
}

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
}

const Dropdown = ({ selected, setSelected }: ListProps) => {
    const [ cryptos, setCryptos ] = useState<Crypto[]>([]);
    const [ favorites, setFavorites ] = useState<string[]>([]);
    const [ loadingFavorites, setLoadingFavorites ] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string | null>(null);

    const { getFavorite, listFavorite } = useFavorite();

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const data = await getCryptos();

                setCryptos(data)

            } catch (error) {
                console.error("Erro ao buscar criptomoedas populares");
            }
        }

        const fectchFavorites = async () => {
            try {
                const data = await listFavorite();

                const favoriteNames = data.map((fav) => fav.cryptoName);
                setFavorites(favoriteNames)

            } catch (error) {
                console.error("Erro na hora de favoritar ");
            }
        }

        fetchCryptos()
        fectchFavorites()
    }, [])

    const handleGetFavorite = useCallback(async (cryptoId: string) => {
        setFavorites(prev => 
            prev.includes(cryptoId) 
                ? prev.filter(id => id !== cryptoId)
                : [...prev, cryptoId]
        );
        
        setLoadingFavorites(prev => ({ ...prev, [cryptoId]: true }));
        
        try {
            await getFavorite(cryptoId);
            const data = await listFavorite();
            const favoriteNames = data.map((fav) => fav.cryptoName);
            setFavorites(favoriteNames);
        } catch (error) {
            setFavorites(prev => 
                prev.includes(cryptoId) 
                    ? prev.filter(id => id !== cryptoId)
                    : [...prev, cryptoId]
            );
            setError("Fail");
        } finally {
            setLoadingFavorites(prev => ({ ...prev, [cryptoId]: false }));
        }
    }, [getFavorite, listFavorite]);


    return(
        <div className="mb-8">
            <Listbox value={selected} onChange={setSelected}>

                <div className="relative">
                    <Listbox.Button className={"w-full p-2 border rounded-md text-left cursor-pointer"}>
                        {selected
                            ? cryptos.find((c) => c.id === selected)?.name
                            : "Selecione uma criptomoeda"}
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className={"absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"}>
                            {cryptos.map((crypto) => (
                                <Listbox.Option
                                    key={crypto.id}
                                    value={crypto.id}
                                    className={({ active }) => 
                                        `cursor-pointer select-none relative px-4 py-2 flex items-center justify-between 
                                        ${active ? "bg-gray-100" : ""
                                    }`}
                                
                            >

                            <div className="flex items-center gap-2">
                                <img src={crypto.image} alt="icon" className="w-5 h-5" />
                                <span>
                                    {crypto.name} ({crypto.symbol.toUpperCase()})
                                </span>
                            </div>

                            <button 
                                type="button"
                                title={favorites.includes(crypto.id) ? "Desfavoritar" : "Favoritar"}
                                aria-label={favorites.includes(crypto.id) ? "Desfavoritar" : "Favoritar"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleGetFavorite(crypto.id);
                                }}
                                className={`text-yellow-500 hover:text-yellow-600 transition-colors duration-200 ${
                                    loadingFavorites[crypto.id] ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                }`}
                                disabled={loadingFavorites[crypto.id]}
                                >
                                {loadingFavorites[crypto.id] ? (
                                    <span className="inline-block animate-spin">...</span>
                                ) : favorites.includes(crypto.id) ? (
                                    <FaStar className="text-yellow-500" />
                                ) : (
                                    <FaRegStar className="text-gray-400 hover:text-yellow-500" />
                                )}
                            </button>
                            </Listbox.Option>
                        ))}
                        </Listbox.Options>
                    </Transition>
                </div>

            </Listbox>
        </div>
    )
}

export default Dropdown