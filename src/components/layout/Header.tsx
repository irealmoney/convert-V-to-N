"use client";

import { CloseButton, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ShoppingCartIcon, UserIcon, Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Key, useContext, useEffect, useRef, useState } from 'react'
// import { Link, NavLink , useNavigate  , useLocation } from 'react-router-dom'
import Link from 'next/link'
import { usePathname, useSearchParams , useRouter } from 'next/navigation';

import Image from 'next/image'
import { AuthContext } from './../../context/AuthContext'
import { toast } from 'react-toastify'
import axios from "axios";

import { Dropdown } from 'rsuite';

import { TbLogin } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";
import { FaRegCircleDot, FaShieldDog } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaSearch } from 'react-icons/fa'
import { IoClose, IoListSharp } from "react-icons/io5";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";

import NavbarCategories from './../common/NavbarCategories'




export default function Header() {

  const router = useRouter();

  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const loading = authContext?.loading;
  const logout = authContext?.logout as (() => void) | undefined;
  const fetchUser = authContext?.fetchUser as (() => Promise<void>) | undefined;
  const [isAdmin, setIsAdmin] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);
  const [category, setCategory] = useState(null);

  const [sideCategory , setSideCategory] = useState(false);
  const [searchModal , setSearchModal] = useState(false)
  const [showDogCategories , setShowDogCategories] = useState(false);
  const [showCatCategories , setCatCategories] = useState(false)
  const [showBirdCategories , setBirdCategories] = useState(false)
  const [showRodentCategories , setRodentCategories] = useState(false)
  const [LgPlusSearch , setLgPlusSearch] = useState(false)
  const containerRef = useRef(null);
  const [activeAnimal, setActiveAnimal] = useState(null);
  const [activeParentId, setActiveParentId] = useState(null);


  //عملیات سرچ کردن 
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ products: [], categories: [] });
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/g-search?query=${value}`);
        setSearchResults(res.data);
      } catch (err) {
        toast.error(`خطا در دریافت نتایج جستجو: ${err}`);
      }
    }, 500);
  };

  useEffect(() => {
    if (LgPlusSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [LgPlusSearch]);
  // unmount  کردن سرچ تایم اوت
  useEffect(() => {
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    let updated = [...recentSearches];
    // حذف مورد تکراری در صورت وجود
    updated = updated.filter(item => item !== trimmed);
    if (updated.length === 7) {
      updated.pop(); // حذف آخری
    }
    updated.unshift(trimmed);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    setLgPlusSearch(false); // بستن پنجره
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const query = searchParams.get('q'); // مستقیم مقدار q را می‌گیرد

    if (pathname === "/products" && query) {
      setSearchTerm(query);
    }
  }, [pathname, searchParams]);


  const checkIsAdmin = async () => {
    const checkAdmin = await axios.get("http://127.0.0.1:8000/api/v1/check-admin", { withCredentials: true });

    if (checkAdmin.data.user === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }
  const fetchAllCategories = async () => {
    let res = await axios.get("http://127.0.0.1:8000/api/v1/categories", { withCredentials: true })
    if (res.data.success === true) {
      setCategory(res.data.data)
    } else {
      if (Array.isArray(res.data?.data)) {

        res.data?.data?.forEach((msg : string, index : number) => {
          toast.error(msg, {
            position: "top-left",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });

      }

      toast.error(res.data.data, {
        position: "top-left",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

    }
  }

  useEffect(() => {
    if (sideCategory) {
    document.body.classList.add("overflow-hidden");
    } else {
    document.body.classList.remove("overflow-hidden");
    }
  }, [sideCategory]);

  useEffect(() => {
    if (searchModal) {
    document.body.classList.add("overflow-hidden");
    } else {
    document.body.classList.remove("overflow-hidden");
    }
  }, [searchModal]);

  useEffect(() => {
    fetchUser?.();
    fetchAllCategories?.();
    checkIsAdmin?.();
  }, []);
  // هندل کلیک بیرون

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = containerRef.current as HTMLElement | null;
      if (container && !container.contains(event.target as Node)) {
        setLgPlusSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

  const logoutHandler = () => {
    logout?.();
    toast.info('با موفقیت خارج شدید', {
      position: "top-left",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }


  let timeoutId: NodeJS.Timeout | any = null; 
  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setShowDogCategories(true);
  };
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDogCategories(false);
    }, 300); 
  };

  const baseURL = "http://127.0.0.1:8000/";





    return (
        <div className=' lg:shadow-lg'>


        {/* //for search box focus */}
            <div className={`fixed bg-black w-full h-full z-49 duration-300 ${LgPlusSearch  ? 'opacity-40 translate-y-0' : 'opacity-0 -translate-y-500' }`}>

            </div>
            
            <div dir='rtl' className={`fixed transition-all ease-in-out duration-300  z-50
            ${sideCategory  ? ' translate-x-0' : 'translate-x-full '}
            bg-white right-0  h-full w-full sm:w-1/2`}
            >
            <div className='flex flex-row items-center px-4 py-3 text-zinc-500 border-b-2 border-zinc-200'>
                <h2 className='flex-1 text-center'>  دسته بندی ها  </h2>
                <button onClick={() => setSideCategory(false)}>
                <IoClose className='size-6 text-zinc-500'/> 
                </button>
            </div>
            </div>
            
            {sideCategory && (
            <div onClick={() => setSideCategory(false)} className='absolute z-40 bg-black/30 right-0  h-full w-full'>

            </div>
            )}

            <div dir='rtl' className={`fixed transition-all ease-in-out duration-300 z-50           
            ${searchModal  ? ' translate-y-0' : 'translate-y-full '}
            bg-white right-0  h-full w-full`}
            >
            <div className='flex flex-row items-center border-b-2 border-zinc-200 py-3 px-4'>
                <h2 className='flex-1 text-center font-bold text-zinc-500'> جست و جو </h2>
                <button onClick={() => setSearchModal(false)}>
                <IoClose className='size-6 text-zinc-500'/>
                </button>
            </div>

            <div className=''>
                <form className="flex relative items-center justify-center max-w-xl mx-auto my-2" >
                    <input placeholder="... اینجا بنویس " type="text" className="w-full bg-white rounded-xl border border-zinc-200  px-14 py-2 text-right outline-none" />
                    <button className="absolute right-0  px-6">
                        <FaSearch className="fill-[#F15A22]" />
                    </button>
                </form>

                <div className='mx-8'>
                <h2 className='text-lg text-zinc-700'>  جست و جو های اخیر  </h2>
                <div className='flex flex-row items-center mt-2'>
                    <Link className='px-2 py-1 rounded-lg border border-zinc-300 text-sm text-zinc-500 bg-zinc-200 mx-1' href={''}>
                    reflex
                    </Link>

                    <Link className='px-2 py-1 rounded-lg border border-zinc-300 text-sm text-zinc-500 bg-zinc-200 mx-1' href={''}>
                    قلاده
                    </Link>
                </div>
                </div>
            </div>


            </div>
            

            <Disclosure as="nav" className="bg-white mx-auto max-lg:shadow-lg ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex flex-row-reverse max-sm:flex-row-reverse h-16 items-center justify-between">





                <div className="flex flex-row justify-between  shrink-0 items-center">
                    <Link href={'/'}>
                    <img
                        alt="Your Company"
                        src="/NIK-LOGO.svg"
                        className="h-9 w-auto"
                    />
                    </Link>


                    <div className='lg:hidden'>
                    <BsList onClick={() => setSideCategory(!sideCategory)} className='size-8 ml-5 cursor-pointer text-[#F15A22]' />
                    </div>
                </div>



                {/* search form lg */}
                <form dir='rtl' onSubmit={handleSubmitSearch} ref={containerRef} className="flex relative items-center justify-center w-3/6 mx-auto max-lg:hidden" >
                    <input onFocus={() => setLgPlusSearch(true)} value={searchTerm} onChange={(e) => handleSearchChange(e)} placeholder=" جستوجو ..." type="text" className="w-full z-50 bg-white rounded-xl border border-zinc-200  px-14 py-2 text-right outline-none" />
                    <button type='submit' className="absolute right-0 z-50 px-6">
                        <FaSearch className="fill-[#F15A22]" />
                    </button>


                    <div className={`absolute w-full ${searchResults.products.length === 0 && searchResults.categories.length === 0 ? 'min-h-0 ' : 'min-h-150'} top-10 bg-white rounded-2xl z-50 duration-500 ease-in-out 
                    ${LgPlusSearch === true ? 'transform opacity-100 translate-x-0 pointer-events-auto' : 'transform opacity-0 -translate-x-300 pointer-events-none' }`} >
                        
                        {searchTerm.length === 0 ? (
                            <div>
                            <h2 className="mt-2 text-zinc-400 border-b border-zinc-300 mx-8 py-2">آخرین جستجوها</h2>
                            <ul className="flex flex-wrap my-4 px-6">
                                {recentSearches.map((item : string, idx: Key | null | undefined) => (
                                <Link
                                    href={`/products?q=${encodeURIComponent(item)}`}
                                    key={idx}
                                    className="flex flex-row w-fit p-2 mx-1 my-1 rounded-full items-center text-sm text-right cursor-pointer bg-zinc-100 text-zinc-500 hover:bg-zinc-200 duration-300 transition-all"
                                    onClick={() => { 
                                        setLgPlusSearch(false)
                                    }
                                    }
                                >
                                    
                                    <MdYoutubeSearchedFor className='size-6 text-zinc-500 '/> {item}
                                </Link>
                                ))}
                            </ul>
                            </div>
                        ) : (
                            <div>
                            {searchResults.products.length > 0  ? (<h2 className='mt-2 text-zinc-400 border-b border-zinc-300 mx-8'>محصولات</h2> ) : (null) }
                            {searchResults.products.length > 0 ? (
                                searchResults.products?.slice(0, 5).map((pr: any)=> {
                                return (
                                    
                                    <a key={pr.slug} href={`/products/s/${pr.slug}`} className='flex flex-row-reverse justify-evenly w-full not-odd:border-b z-50 border-zinc-200 px-6 py-2  duration-300 hover:bg-zinc-200'>
                                        <h2 className='w-3/4 text-[12px]'> {pr.title} </h2>
                                        <img src={`${baseURL}public${pr.mainImage?.[0]?.['480']}`} alt="تصویر محصول" className='size-12' />
                                    </a>
                                )
                                })
                            ):(null)}

                            {searchResults.products.length > 5 && (
                                <button
                                onClick={() => {
                                    router.push(`/products?q=${encodeURIComponent(searchTerm)}`)
                                    setLgPlusSearch(false)
                                }}
                                className="text-center w-full text-sm text-[#F15A22] mt-2 py-3 duration-300 cursor-pointer hover:bg-zinc-100"
                                >
                                نمایش همه نتایج
                                </button>
                            )}

                            {searchResults.categories.length > 0 ? (<h2 className='mt-2 text-zinc-400 border-b border-zinc-300 mx-8'>دسته بندی ها </h2>) : (null)}
                            {searchResults.categories.length > 0 ? (
                                searchResults.categories?.map((cat : any)=> {
                                return (
                                    <a key={cat.slug} href={`/products/${cat.slug}`} className='flex flex-row justify-evenly w-full   not-last:border-b z-50 border-zinc-200 px-6 py-2  duration-300 hover:bg-zinc-200'>
                                    <span> <BiCategoryAlt /> </span> <span className='flex-1 mr-4'> {cat.name}  </span> <span> <FaExternalLinkAlt /> </span>
                                    </a>
                                )
                                })
                            ) : (null)}
                            </div>
                        )}

                    </div>
                </form>

                {/* user and notif and Shoping cart  */}
                <div className=" inset-y-0 right-0 flex justify-between items-center pr-2  sm:static sm:inset-auto  sm:pr-0">


                    {/* <button
                    type="button"
                    className=" rounded-full bg-orange-600 mx-1 p-1 text-white duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:duration-300"
                    >

                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                    </button> */}

                    <Link
                    href={'/user-panel/cart'}
                    className="= rounded-full  mx-1 p-1 text-[#F15A22] duration-400 hover:text-white hover:bg-[#F15A22] focus:outline-none "
                    >
                    <span className="sr-only">View shoping cart</span>
                    <RiShoppingCartLine  aria-hidden="true" className="size-6" />
                    </Link>


                    {/* <Link
                    to={'/support'}
                    className="= rounded-full  mx-1 p-1 text-white duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:duration-300"
                    >

                    <span className="sr-only">View shoping cart</span>
                    <BiSupport aria-hidden="true" className="size-6" />
                    </Link> */}

                    {!user ? (
                    <div className='ml-1 px-1'>
                        <Link className='flex flex-row-reverse items-center border-2 font-bold text-sm border-[#F15A22] rounded-xl px-2 py-1 text-[#F15A22] duration-400 hover:bg-[#F15A22] hover:text-white' href={'/auth'}>
                        <span className=''> ورود - عضویت </span>  <TbLogin className='size-5'/>
                        </Link>
                    </div>
                    ):(
                    <Menu as="div" className="relative mx-1">
                        <div>
                        <MenuButton className="relative flex rounded-full cursor-pointer bg-white text-[#F15A22] text-sm duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2  focus:duration-300 hover:bg-[#F15A22] hover:text-white">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            {
                            user?.avatar[0] ? <img className='rounded-full size-8 object-cover' src={`${baseURL}${user?.avatar[0]}`} /> : <AiOutlineUser   className="size-8  p-1" />
                            }

                        </MenuButton>
                        </div>

                        

                        <MenuItems
                            transition
                            className="absolute left-0 z-50 mt-2 w-48 origin-top-right text-center rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <MenuItem>
                            <Link
                                href={"/user-panel/pr"}
                                className="block px-4 py-2 text-sm text-orange-600 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            >
                                پروفایل کاربری
                            </Link>
                            </MenuItem>
                            {isAdmin ? (
                            <MenuItem>
                                <Link
                                href={"/admin"}
                                className="block px-4 py-2 text-sm text-orange-600 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                >
                                پنل ادمین
                                </Link>
                            </MenuItem>
                            ) : (
                            ''
                            )}
                            <MenuItems>
                            <button
                                className="block px-4 py-2 text-sm text-orange-600 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                onClick={logoutHandler}
                            >
                                خروج
                            </button>
                            </MenuItems>
                        </MenuItems>

                    </Menu>
                    )}

                    <button
                    onClick={() => setSearchModal(true)}
                    type="button"
                    className=" rounded-full mx-1 p-1 text-[#F15A22] duration-400 hover:text-white lg:hidden hover:bg-[#F15A22] cursor-pointer focus:outline-none "
                    >
                    <RiSearchLine  className="size-6"/>
                    </button>

                </div>

                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                {/* <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                    <DisclosureButton

                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                        item.current ? 'bg-orange-600 text-white' : 'text-orange-600 hover:bg-orange-600 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    >
                    {item.name}
                    </DisclosureButton>
                ))}
                </div> */}
            </DisclosurePanel>


            </Disclosure>

            <div dir='rtl' className='relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3 max-lg:hidden'>
            <div className='flex flex-row justify-start'>
                {/* <button onClick={() => {setOpenMenu(!openMenu) ; setShowDogCategories(false) ; setBirdCategories(false) ; setCatCategories(false) ; setRodentCategories(false) }} className='flex flex-row items-center text-sm pl-4 cursor-pointer text-gray-500 border-l-2 border-gray-300  duration-300 hover:text-gray-800'>
                <BsList className='size-5 ml-2' /> دسته بندی ها  
                </button> */}

                <Link  className='flex flex-row items-center text-sm px-4 cursor-pointer text-gray-500 duration-300 hover:text-gray-800  border-l-2 border-gray-300' href={'/'}>
                خانه 
                </Link>


                <NavbarCategories category={category}/>


                <Link href={'/best-offers'} className='flex flex-row items-center text-sm px-4 cursor-pointer text-gray-500 duration-300 hover:text-gray-800'>
                فروش ویژه
                </Link>

                <Link href={'/about'} className='flex flex-row items-center text-sm px-4 cursor-pointer text-gray-500 duration-300 hover:text-gray-800'>
                    تماس با ما
                </Link>

                


            </div>
            
                <div 
                dir='rtl' 
                onMouseLeave={handleMouseLeave} 
                className={`absolute -translate-x-1/2 z-50 left-1/2 mt-2 w-full bg-white text-zinc-600 shadow-lg rounded-b-2xl p-4 grid grid-cols-3 md:grid-cols-5 gap-2
                    transition-all duration-300 ease-in-out
                    ${openMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                >
                    
                <div className='border-l-2 border-zinc-300 '>
                    <button onMouseEnter={handleMouseEnter} className='px-3 text-sm'>سگ</button>
                    <button onMouseEnter={handleMouseEnter} className='px-3 text-sm'>گربه</button>
                    <button onMouseEnter={handleMouseEnter} className='px-3 text-sm'>پرنده</button>
                    <button onMouseEnter={handleMouseEnter} className='px-3 text-sm'>جونده</button>
                </div>
                  
                {Array.isArray(category) && (category as Array<any>)
                    ?.filter((cat : any) => !cat.parent)
                    .map((parent : any, index : number) => (
                    <div className='w-full flex flex-col p-2' key={index}>

                        <div className='w-full flex flex-row justify-between items-center duration-300 hover:text-[#F15A22]'>
                        <Link href={`/products/${parent.slug}`}  >

                            <h2 className='w-full text-right text-xs font-bold'>{parent.name} </h2>
                        </Link>
                        </div>

                        <div>
                        {Array.isArray(category) &&
                            (category as Array<any>)
                                ?.filter((cat: any) => cat.parent === parent._id)
                                .map((child: any, index: number, filteredChildren: Array<any>) => (
                                    <Link 
                                        href={`/products/${parent.slug}/${child.slug}`} 
                                        key={index} 
                                        className={`py-2 duration-300 hover:text-[#F15A22] flex flex-row items-center justify-between ${index === filteredChildren.length - 1 ? 'border-b-0' : 'border-b-1 border-gray-300'}`}
                                    >

                                <div className="flex flex-row items-center justify-between w-full">
                                <div className='flex flex-row items-center text-[10px]'>
                                    <FaRegCircleDot className='ml-2 fill-[#F15A22]' />
                                    {child?.name}
                                </div>
                                </div>

                            </Link>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>


                <div 
                dir='rtl' 
                onMouseLeave={handleMouseLeave} 
                className={`absolute -translate-x-1/2 z-50 left-1/2 mt-2 w-full bg-white text-zinc-600 shadow-lg rounded-b-2xl p-4 grid grid-cols-3 md:grid-cols-5 gap-2
                    transition-all duration-300 ease-in-out
                    ${showCatCategories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                >
                    
                {Array.isArray(category) && (category as Array<any>)
                    ?.filter((cat : any) => !cat.parent && cat.forAnimal === "cat")
                    .map((parent : any, index : number) => (
                    <div className='w-full flex flex-col p-2' key={index}>

                        <div className='w-full flex flex-row justify-between items-center duration-300 hover:text-[#F15A22]'>
                        <Link href={`/products/${parent.slug}`}  >
                            <h2 className='w-full text-right text-xs font-bold'>{parent.name} </h2>
                        </Link>
                        </div>

                        <div>
                        {(category as Array<any>)
                            ?.filter((cat : any) => cat.parent === parent._id)
                            .map((child : any, index : number, filteredChildren : Array<any>) => (
                            <Link href={`/products/${parent.slug}/${child.slug}`} key={index} className={`py-2 duration-300 hover:text-[#F15A22] flex  flex-row items-center justify-between ${index === filteredChildren.length - 1 ? 'border-b-0' : 'border-b-1 border-gray-300'}`}>

                                <div className="flex flex-row items-center justify-between w-full">
                                <div className='flex flex-row items-center text-[10px]'>
                                    <FaRegCircleDot className='ml-2 fill-[#F15A22]' />
                                    {child?.name}
                                </div>
                                </div>

                            </Link>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>



                <div 
                dir='rtl' 
                onMouseLeave={handleMouseLeave} 
                className={`absolute -translate-x-1/2 z-50 left-1/2 mt-2 w-full bg-white text-zinc-600 shadow-lg rounded-b-2xl p-4 grid grid-cols-3 md:grid-cols-5 gap-2
                    transition-all duration-300 ease-in-out
                    ${showBirdCategories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                >
                    
                {Array.isArray(category) && (category as Array<any>)
                    ?.filter((cat : any) => !cat.parent && cat.forAnimal === "bird")
                    .map((parent, index) => (
                    <div className='w-full flex flex-col p-2' key={index}>

                        <div className='w-full flex flex-row justify-between items-center duration-300 hover:text-[#F15A22]'>
                        <Link href={`/products/${parent.slug}`}  >
                            <h2 className='w-full text-right text-xs font-bold'>{parent.name} </h2>
                        </Link>
                        </div>

                        <div>
                        {Array.isArray(category) && (category as Array<any>)
                            ?.filter((cat : any) => cat.parent === parent._id)
                            .map((child, index, filteredChildren) => (
                            <Link href={`/products/${parent.slug}/${child.slug}`} key={index} className={`py-2 duration-300 hover:text-[#F15A22] flex  flex-row items-center justify-between ${index === filteredChildren.length - 1 ? 'border-b-0' : 'border-b-1 border-gray-300'}`}>

                                <div className="flex flex-row items-center justify-between w-full">
                                <div className='flex flex-row items-center text-[10px]'>
                                    <FaRegCircleDot className='ml-2 fill-[#F15A22]' />
                                    {child?.name}
                                </div>
                                </div>

                            </Link>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>


                <div 
                dir='rtl' 
                onMouseLeave={handleMouseLeave} 
                className={`absolute -translate-x-1/2 z-50 left-1/2 mt-2 w-full bg-white text-zinc-600 shadow-lg rounded-b-2xl p-4 grid grid-cols-3 md:grid-cols-5 gap-2
                    transition-all duration-300 ease-in-out
                    ${showRodentCategories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                >
                    
                {Array.isArray(category) && (category as Array<any>)
                    ?.filter((cat) => !cat.parent && cat.forAnimal === "rodent")
                    .map((parent : any, index : number) => (
                    <div className='w-full flex flex-col p-2' key={index}>

                        <div className='w-full flex flex-row justify-between items-center duration-300 hover:text-[#F15A22]'>
                        <Link href={`/products/${parent.slug}`}  >
                            <h2 className='w-full text-right text-xs font-bold'>{parent.name} </h2>
                        </Link>
                        </div>

                        <div>
                        {Array.isArray(category) && (category as Array<any>)
                            ?.filter((cat) => cat.parent === parent._id)
                            .map((child, index, filteredChildren) => (
                            <Link href={`/products/${parent.slug}/${child.slug}`} key={index} className={`py-2 duration-300 hover:text-[#F15A22] flex  flex-row items-center justify-between ${index === filteredChildren.length - 1 ? 'border-b-0' : 'border-b-1 border-gray-300'}`}>

                                <div className="flex flex-row items-center justify-between w-full">
                                <div className='flex flex-row items-center text-[10px]'>
                                    <FaRegCircleDot className='ml-2 fill-[#F15A22]' />
                                    {child?.name}
                                </div>
                                </div>

                            </Link>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>



            </div>

        </div>
    );
}