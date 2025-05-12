import { useHistory } from "../../hooks/useHistory";
import { useEffect, useState } from "react";

interface Conversion {
    id: number;
    cryptoName: string;
    amount: number;
    brl: number;
    usd: number;
    createdAt: string;
}

const History = () => {
    const [ history, setHistory ] = useState<Conversion[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [ error, setError ] = useState("")

    const { handleHistory } = useHistory()

    useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await handleHistory();
        if (!Array.isArray(data)) throw new Error("Formato de dados inválido")
        setHistory(data)
      
      } catch (err: any) {
        setError("Nenhuma conversão realizada ainda.");
      }
    };

    fetchHistory();
  }, []);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const currentData = history.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Histórico de Conversões</h1>
      
      {history.length === 0 ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-left">
                <th className="p-3 font-semibold">Criptomoeda</th>
                <th className="p-3 font-semibold">Quantidade</th>
                <th className="p-3 font-semibold">USD</th>
                <th className="p-3 font-semibold">BRL</th>
                <th className="p-3 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="border-b border-zinc-800">
                  <td className="p-3">{item.cryptoName.toUpperCase()}</td>
                  <td className="p-3">{item.amount}</td>
                  <td className="p-3">
                    {item.usd.toLocaleString("USD", {
                        style: "currency",
                        currency: "USD"
                    })}
                  </td>
                  <td className="p-3">
                    {item.brl.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                  </td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-10 gap-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded ${
                  num === currentPage
                    ? "bg-orange-800 text-white font-semibold cursor-pointer"
                    : "bg-orange-500 hover:bg-orange-800 text-white cursor-pointer"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default History