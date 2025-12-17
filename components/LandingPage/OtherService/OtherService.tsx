import WorkWithUsButton from "@/components/ui/work-with-us-button";
import { BarChart3, CalendarDays, Target, Users2 } from "lucide-react";

const OtherService = () => {
  const services = [
    {
      title: "Strategy",
      icon: <Target className="w-10 h-10 text-blue-400" />,
      description:
        "Our expertise lies in guiding you through the process of creating a comprehensive plan or approach to achieve your specific objectives or goals. This includes analyzing your current situation, defining clear objectives, and identifying the most effective and efficient course of action to attain your desired outcomes.",
    },
    {
      title: "Events Management",
      icon: <CalendarDays className="w-10 h-10 text-blue-400" />,
      description:
        "From initial concept development to flawless execution, we meticulously plan and curate each strategic networking mixer, leaving no room for anything less than excellence. Your event will be a seamlessly orchestrated experience, designed to create a lasting impact and enhance your organization's reputation.",
    },
    {
      title: "Sales Operation",
      icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
      description:
        "We take pride in developing customized marketing strategies that cater to your specific needs. Understanding the significance of brand visibility, we work diligently to enhance your market presence. With our expertise and innovative approach, our aim is to drive remarkable growth and successfully reach your target market.",
    },
    {
      title: "Training & Coaching",
      icon: <Users2 className="w-10 h-10 text-blue-400" />,
      description:
        "Our sales training service acts as a catalyst for continuous improvement and growth within your sales team. We are committed to providing your team with the expertise and resources needed to thrive in today's fast-paced sales environment.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 lg:px-12 xl:px-16 py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight">
          Our Exciting Service Offerings
        </h2>
        <WorkWithUsButton />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {services.map((service, index) => (
          <div key={index} className="space-y-4">
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900">
              {service.title}
            </h3>
            <p className="text-lg lg:text-2xl leading-relaxed sm:leading-normal text-gray-700 font-sans font-normal">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OtherService;
