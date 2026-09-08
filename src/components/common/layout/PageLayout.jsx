import Header from './Header';

const PageLayout = ({ showHeader = true, children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default PageLayout;
