// "use client";

// import { useEffect, useRef, useState } from "react";
// import axios from "@/api/axios";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { X } from "lucide-react";

// import { UpdateProfileSchema } from "@/schemas";
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";

// import { LiaUserEditSolid } from "react-icons/lia";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import { useAuth } from "@/hooks/useAuth";
// import { useUserStore } from "@/hooks/use-current-user";

// export default function Page() {
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const { user, setUser, token } = useAuth();
//   const setUserStore = useUserStore((state) => state?.setUserStore);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();
//   const [defaultImg, setDefaultImg] = useState<string | null>(
//     `${process.env.BASE_URL}${user?.profile_image}` ||
//       user?.google_picture ||
//       null,
//   );
//   const [previewImage, setPreviewImage] = useState<string | null>(
//     defaultImg || null,
//   );
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const form = useForm<z.infer<typeof UpdateProfileSchema>>({
//     resolver: zodResolver(UpdateProfileSchema),
//     defaultValues: {
//       firstName: user?.firstName || "",
//       lastName: user?.lastName || "",
//       profile_image: user?.profile_image
//         ? new File([], user.profile_image)
//         : undefined,
//     },
//   });

//   useEffect(() => {
//     if (fileInputRef.current) {
//       fileInputRef.current.focus();
//     }
//   }, []);

//   useEffect(() => {
//     const baseUrl = process.env.BASE_URL || "http://localhost:8080/api";
//     if (user?.profile_image) {
//       setDefaultImg(`${process.env.BASE_URL}${user.profile_image}`);
//       setPreviewImage(`${baseUrl}${user.profile_image}`);
//     } else if (user?.google_picture) {
//       setDefaultImg(user?.google_picture);
//       setPreviewImage(user?.google_picture);
//     }
//   }, [user]);

//   const onSubmitUpdate = async (
//     values: z.infer<typeof UpdateProfileSchema>,
//   ) => {
//     // Here you would typically send the updated data to your backend
//     const formData = new FormData();

//     formData.append("firstName", values.firstName || "");
//     formData.append("lastName", values.lastName || "");
//     if (values.profile_image) {
//       formData.append("profile_image", values.profile_image as File);
//     }
//     try {
//       setError("");
//       setIsPending(true);
//       const response = await axios.put("update-profile/", formData, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`, // Send access token
//           "Content-Type": "multipart/form-data", // Important for file uploads
//         },
//       });

//       setSuccess("Profile updated successfully");
//       setUser(response.data); // Update user in context or state
//       setUserStore(response.data);
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setIsEditModalOpen(false);
//     } catch (err: any) {
//       setIsPending(false);
//       if (!err?.response) setError("No Server Response");
//       else if (err.response?.status === 500)
//         setError("Something went wrong. Please try again.");
//       else setError(err.response?.data?.error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       form.setValue("profile_image", file);
//     }
//   };

//   const handleImageCancel = () => {
//     setPreviewImage(defaultImg || null);
//     form.setValue("profile_image", undefined);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const [projectsCount, setProjectsCount] = useState(0);
//   const [scenariosCount, setScenariosCount] = useState(0);

//   useEffect(() => {
//     const fetchDetailsProject = async () => {
//       const projects = await axios.get("/projects/list");

//       setProjectsCount(projects.data.length);
//       const totalScenarios = projects.data.reduce(
//         (acc: number, project: any) => acc + project.scenario_count,
//         0,
//       );
//       setScenariosCount(totalScenarios);
//     };
//     fetchDetailsProject();
//   }, [user]);

//   return (
//     <div className="flex justify-center items-center h-[95vh] bg-gray-100 dark:bg-background">
//       <div className="w-full max-h-fit mt-10 max-w-lg bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//         <div className=" h-40 mb-10  bg-gradient-to-r from-[#a5d7a7] to-[#4caf50]">
//           {/* Gradient Background */}
//         </div>
//         <div className="pt-16 pb-8 px-6 relative">
//           <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-32 h-32">
//             <Avatar className="w-full h-full">
//               {!user?.google_picture || user?.profile_image ? (
//                 <AvatarImage
//                   src={`api${user?.profile_image}`}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <AvatarImage
//                   src={user?.google_picture || undefined}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </div>
//           <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
//             {user?.firstName} {user?.lastName}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
//             {user?.email}
//           </p>
//           <div className="flex justify-around text-center">
//             <div>
//               <span className="block text-xl font-bold text-gray-700 dark:text-gray-300">
//                 {projectsCount}
//               </span>
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Projects
//               </span>
//             </div>
//             <div>
//               <span className="block text-xl font-bold text-gray-700 dark:text-gray-300">
//                 {scenariosCount}
//               </span>
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Scenarios
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="px-6 pb-6">
//           <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//             <DialogTrigger asChild>
//               <div className="flex justify-center">
//                 <Button className="w-1/2 bg-gradient-to-r from-[#a5d7a7] to-[#4caf50] text-white font-bold py-2 px-4 rounded-full hover:bg-[length:200%_100%] bg-[length:100%_100%] transition-all ease-in-out duration-500 hover:bg-right">
//                   Edit Profile
//                 </Button>
//               </div>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//               </DialogHeader>

//               <Form {...form}>
//                 <form encType="multipart/form-data" className="space-y-6">
//                   <div className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="profile_image"
//                       render={() => (
//                         <FormItem>
//                           <div className="flex flex-col items-center justify-center mb-6">
//                             <FormLabel className="text-center text-gray-700 dark:text-gray-300 mb-4">
//                               Profile Image
//                             </FormLabel>
//                             <div className="relative w-24 h-24">
//                               <div className="w-full h-full relative flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-500">
//                                 <div className="absolute z-20 bottom-0 right-0 rounded-full p-1 bg-gray-500 cursor-pointer dark:bg-gray-200">
//                                   <LiaUserEditSolid
//                                     onClick={() =>
//                                       fileInputRef.current?.click()
//                                     }
//                                     className="text-white  dark:text-black"
//                                     size={20}
//                                   />
//                                 </div>
//                                 {previewImage ? (
//                                   <Avatar className="w-full h-full">
//                                     <AvatarImage
//                                       src={`${previewImage}`}
//                                       className="object-cover w-full h-full"
//                                     />
//                                     <AvatarFallback>CN</AvatarFallback>
//                                   </Avatar>
//                                 ) : (
//                                   <div className="flex items-center justify-center w-full h-full text-gray-400">
//                                     No image
//                                   </div>
//                                 )}
//                               </div>
//                               <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={handleImageChange}
//                                 disabled={isPending}
//                                 accept="image/*"
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
//                               />
//                               {previewImage && previewImage !== defaultImg && (
//                                 <Button
//                                   type="button"
//                                   variant="destructive"
//                                   size="icon"
//                                   onClick={handleImageCancel}
//                                   className="absolute -top-2 -right-2 rounded-full p-1"
//                                   aria-label="Remove image"
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               )}
//                             </div>
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="firstName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>First Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               disabled={isPending}
//                               placeholder="John"
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="lastName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Last Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               disabled={isPending}
//                               placeholder="Doe"
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <FormError message={error} />
//                   <FormSuccess message={success} />
//                   <Button
//                     onClick={() => onSubmitUpdate(form.getValues())}
//                     type="submit"
//                     disabled={isPending}
//                     className="w-full"
//                   >
//                     Update Profile
//                   </Button>
//                 </form>
//               </Form>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// }
