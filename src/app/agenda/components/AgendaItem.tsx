interface AgendaItemProps {
    date: Date | null;
  }
  
  const AgendaItem: React.FC<AgendaItemProps> = ({ date }) => {
    if (!date) return <p>Selecione uma data para ver os compromissos.</p>;
  
    return (
      <div>
        <h2>Compromissos para {date.toLocaleDateString()}</h2>
        {/* Aqui você pode mapear os compromissos de acordo com a data */}
      </div>
    );
  };
  
  export default AgendaItem;