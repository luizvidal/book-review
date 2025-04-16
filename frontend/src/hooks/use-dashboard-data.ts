"use client";

import { useToast } from "@/hooks/use-toast";
import { booksApi, reviewsApi } from "@/lib/api";
import { Book } from "@/types/book";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";

export function useDashboardData() {
	const { toast } = useToast();
	const [books, setBooks] = useState<Book[]>([]);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				const [booksData, reviewsData] = await Promise.all([
					booksApi.getAll(),
					reviewsApi.getMyReviews(),
				]);

				// Handle books data
				if (Array.isArray(booksData)) {
					setBooks(booksData);
				} else if (booksData && typeof booksData === "object") {
					// If it's an object with books property
					if (Array.isArray(booksData.books)) {
						setBooks(booksData.books);
					} else {
						// Convert object to array if needed
						const booksArray = Object.values(booksData).filter(
							(item) => item && typeof item === "object" && "id" in item
						);
						setBooks(booksArray as Book[]);
					}
				} else {
					// Fallback to empty array
					console.error("Unexpected books data format:", booksData);
					setBooks([]);
				}

				// Handle reviews data
				if (Array.isArray(reviewsData)) {
					setReviews(reviewsData);
				} else if (reviewsData && typeof reviewsData === "object") {
					// If it's an object with reviews property
					if (Array.isArray(reviewsData.reviews)) {
						setReviews(reviewsData.reviews);
					} else {
						// Convert object to array if needed
						const reviewsArray = Object.values(reviewsData).filter(
							(item) => item && typeof item === "object" && "id" in item
						);
						setReviews(reviewsArray as Review[]);
					}
				} else {
					// Fallback to empty array
					console.error("Unexpected reviews data format:", reviewsData);
					setReviews([]);
				}
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
				toast({
					title: "Error",
					description: "Failed to load dashboard data",
					variant: "destructive",
				});
				// Set empty arrays on error
				setBooks([]);
				setReviews([]);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [toast]);

	async function handleDeleteReview(id: string) {
		try {
			await reviewsApi.delete(id);
			setReviews(reviews.filter((review) => review.id !== id));
			toast({
				title: "Success",
				description: "Review deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting review:", error);
			toast({
				title: "Error",
				description: "Failed to delete review",
				variant: "destructive",
			});
		}
	}

	return {
		books,
		reviews,
		isLoading,
		handleDeleteReview,
	};
}
