
interface FAQProps {
  question: string;
  answer: string;
}

export function FAQ({ question, answer }: FAQProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
}
