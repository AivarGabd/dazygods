import Link from "next/link";

const footerLinks = ["Контакты", "Доставка", "Гарантия и возврат"];

const footerLinks1 = ["Оплата", "Политика конфиденциальности"];

const Footer = () => {
  return (
    <div className="flex w-full mt-auto mb-0 px-10 bg-default-100 py-4 gap-6">
      <div className="flex flex-col gap-2">
        {footerLinks.map((link, index) => (
          <div key={index}>
            <Link href={"/about"}>{link}</Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {footerLinks1.map((link, index) => (
          <div key={index}>
            <Link href={"/about"}>{link}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
