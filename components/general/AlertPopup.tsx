"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface AlertBoxProps {
    onConfirm: () => void;
    title?: string; 
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

export const AlertPopup = ({onConfirm, title = "Are you sure?", description = "This action cannot be undone. This will permanently delete employee details from the database.", confirmText = "Delete", cancelText = "Cancel"}: AlertBoxProps) => {
    return (
        <AlertDialog  >
                                  
                                      <AlertDialogTrigger asChild>
                                     <Button variant="outline" size="icon" className="cursor-pointer">
                                      <Trash2 className="h-4 w-4" />
                                     </Button>  
                                      </AlertDialogTrigger>
                                 
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle  >{title}</AlertDialogTitle >
                                      <AlertDialogDescription>
                                        {description}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="cursor-pointer">{cancelText}</AlertDialogCancel>
                                      <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={() => {
                                        onConfirm();
                                      }}>{confirmText}</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
    );
};