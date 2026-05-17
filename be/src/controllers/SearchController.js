const { searchAll } = require("../services/search.service");

class SearchController {
  async search(req, res) {
    try {
      const query = req.query.q ?? "";
      const limit = Number(req.query.limit ?? 6);

      if (!String(query).trim()) {
        return res.status(200).json({ query: "", items: [] });
      }

      const data = await searchAll(query, limit);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error: " + error });
    }
  }
}

module.exports = new SearchController();
