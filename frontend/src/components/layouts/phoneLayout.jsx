const styles = {
  minHeight: '600px',
  maxHeight: '600px',
  maxWidth: '350px',
  minWidth: '350px',
};

const PhoneLayout = ({ children }) => {
  return (
    <section className="px-48 py-6">
      <main
        style={styles}
        className="overflow-auto rounded-3xl border-4 border-slate-900 shadow-lg scrollbar-hide"
      >
        {children}
      </main>
    </section>
  );
};

export default PhoneLayout;
