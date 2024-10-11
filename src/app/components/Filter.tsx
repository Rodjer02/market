interface FilterProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  types,
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="mb-4">
      <h2 className="font-bold">Фильтр по типу</h2>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="mt-2 p-2 border"
      >
        <option value="">Все</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
