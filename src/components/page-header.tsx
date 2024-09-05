function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
}

export default PageHeader;
