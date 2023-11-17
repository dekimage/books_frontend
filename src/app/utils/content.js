export const formatRoutineContent = (content) => {
  const steps = content.split(/\d+\./);

  steps.shift();

  return steps.map((step, index) => (
    <p key={index} className="leading-7 text-sm">
      {`${index + 1}. ${step.trim()}`}
    </p>
  ));
};
