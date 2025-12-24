import { useState , useRef  } from 'react';
import Link from 'next/link';


import { FaRegCircleDot } from 'react-icons/fa6';
import { IoIosArrowBack } from "react-icons/io";

export default function NavbarCategories({ category }: { category: any }) {

    const animals = [
        { key: 'dog', label: 'سگ' },
        { key: 'cat', label: 'گربه' },
        { key: 'bird', label: 'پرندگان' },
        { key: 'rodent', label: 'جوندگان' }
    ];

  const [activeAnimal, setActiveAnimal] = useState(null);
  const [activeParent, setActiveParent] = useState(null);
  const hoverTimeout = useRef(null);
  const animalHoverTimeout = useRef(null);






  const parentCategories = category?.filter((cat: any) => !cat.parent);





  const getCategoriesByAnimal = (animal: any) => {
    return parentCategories?.filter((cat: any) => cat.forAnimal === animal);
  };






  const getSubcategories = (parentId : any) => {
    return category?.filter((cat : any) => cat.parent === parentId);
  };





  const handleParentEnter = (id : any) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveParent(id);
  };





  const handleParentLeave = () => {
    hoverTimeout.current = setTimeout(() => setActiveParent(null), 300);
  };





  const handleAnimalEnter = (animalKey : any, hasDropdown : any) => {
    if (animalHoverTimeout.current) clearTimeout(animalHoverTimeout.current);
    if (!hasDropdown) return; // اگر زیرمجموعه نداشت، هیچ کاری نکن
    setActiveAnimal(animalKey);
  };






  const handleAnimalLeave = () => {
    animalHoverTimeout.current = setTimeout(() => {
      setActiveAnimal(null);
      setActiveParent(null);
    }, 300);
  };



  return (
    <nav className="flex flex-row  text-sm text-zinc-700 relative">
      {animals.map((animal) => {
        const animalCategories = getCategoriesByAnimal(animal.key);
        const hasDropdown = animalCategories?.length > 0;

        return (
          <div
            key={animal.key}
            onMouseEnter={() => handleAnimalEnter(animal.key, hasDropdown)}
            onMouseLeave={handleAnimalLeave}
            className="relative"
          >
            <button
              className={`transition-all text-gray-500 duration-300 hover:text-gray-800 ease-in-out px-4  rounded  ${
                activeAnimal === animal.key ? 'text-[#F15A22]' : ''
              }`}
            >
              {animal.label}
            </button>

            <div
              className={`absolute z-50 right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-2 text-right transition-all duration-300 ease-in-out
                ${activeAnimal === animal.key ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
              onMouseEnter={() => {
                if (animalHoverTimeout.current) clearTimeout(animalHoverTimeout.current as NodeJS.Timeout);
              }}
              onMouseLeave={handleAnimalLeave}
            >
              {hasDropdown && animalCategories.map((parent :any) => {
                const children = getSubcategories(parent._id);
                const hasChildren = children.length > 0;

                return (
                    <div
                        key={parent._id}
                        onMouseEnter={() => handleParentEnter(parent._id)}
                        onMouseLeave={handleParentLeave}
                        className="relative group py-4"
                    >
                        <Link
                            href={`/products/${parent.slug}`}
                            className={`text-sm font-bold text-gray-500 duration-300 hover:text-gray-800 flex flex-row-reverse ${hasChildren ? 'justify-between' : 'justify-end'} `}
                        >
                            {hasChildren ? <IoIosArrowBack /> : ''}
                            {parent.name}
                        </Link>

                        <div
                        className={`absolute top-0 right-full mr-2 w-64 bg-white rounded-lg shadow-lg p-2 transition-all duration-300 ease-in-out
                            ${activeParent === parent._id && hasChildren ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                        onMouseEnter={() => clearTimeout(hoverTimeout.current)}
                        onMouseLeave={handleParentLeave}
                        >
                        {hasChildren && children.map((child : any) => (
                            <Link
                            key={child._id}
                            href={`/products/${parent.slug}/${child.slug}`}
                            className="block text-sm py-4 text-gray-500 duration-300 hover:text-gray-800"
                            >
                                <FaRegCircleDot className="inline ml-2 text-[#F15A22]" />
                                {child.name}
                            </Link>
                        ))}
                        </div>
                    </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>

    );
}