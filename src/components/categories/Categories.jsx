import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Stack, Spinner } from "react-bootstrap";
import axios from "../../api";

const Categories = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = useCallback(async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-3">
      <div className="display-6 mb-3">Categories</div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCategory("All")}
          >
            All
          </Button>
          {categories.map((category, idx) => {
            return (
              <Button
                key={category.id}
                variant="primary"
                size="sm"
                onClick={() => setCategory(category.category)}
              >
                {category.category}
              </Button>
            );
          })}
        </Stack>
      )}
    </div>
  );
};

export default Categories;
