import React from "react";

export default function Benefits() {
  const benefits = [
    {
      title: "Unlimited Access to Free Books",
      description:
        "Users can enjoy a wide range of books without any cost. Your website provides a platform for readers to access an extensive library of books spanning various genres.",
    },
    {
      title: "Community-driven Content",
      description:
        "Bookverse fosters a sense of community by allowing users to upload their own books. This not only expands the variety of content available on the platform.",
    },
    {
      title: "Personalized Reading Experience",
      description:
        "The platform offers users the opportunity to customize their reading experience. Through features such as bookmarking, personalized libraries.",
    },
  ];

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4">
            {benefits.map(({ title, description }, index) => {
              return (
                <div class="p-4 lg:w-1/3 md:w-full">
                  <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-8 h-8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div class="flex-grow">
                      <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                        {title}
                      </h2>
                      <p class="leading-relaxed text-base">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}