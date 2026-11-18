export class StatsService {
	constructor(supabaseClient) {
		if (!supabaseClient || typeof supabaseClient.rpc !== "function") {
			throw new TypeError("A Supabase client is required to load public stats.");
		}

		this.supabaseClient = supabaseClient;
	}

	async getPublicStats() {
		const { data, error } = await this.supabaseClient.rpc("get_public_stats");
		if (error) throw error;

		if (!Array.isArray(data) || data.length !== 1) {
			throw new Error("The public stats RPC returned an invalid response.");
		}

		const stats = data[0];
		for (const key of ["total_creators", "total_ideas"]) {
			if (
				typeof stats[key] !== "number" ||
				!Number.isFinite(stats[key]) ||
				stats[key] < 0
			) {
				throw new Error(`The public stats RPC returned an invalid ${key}.`);
			}
		}

		if (
			stats.avg_rating !== null &&
			(typeof stats.avg_rating !== "number" ||
				!Number.isFinite(stats.avg_rating) ||
				stats.avg_rating < 0)
		) {
			throw new Error("The public stats RPC returned an invalid avg_rating.");
		}

		return stats;
	}
}
