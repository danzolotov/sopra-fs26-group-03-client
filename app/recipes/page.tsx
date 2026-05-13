"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  Typography, Card, Tag, Spin, message, List, Button, 
  Modal, Form, Input, InputNumber, Select, Space, Divider 
} from "antd";
import { 
  EditOutlined, PlusOutlined, DeleteOutlined 
} from "@ant-design/icons";
import DashboardShell from "@/components/dashboard-shell";
import GroupRequired from "@/components/group-required";
import { useApi } from "@/hooks/useApi";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { Recipe, RecipePutDTO } from "@/types/recipe";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const RecipesPage: React.FC = () => {
  const api = useApi();
  const { hasGroup, isLoading: isGroupLoading } = useGroupMembership();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form] = Form.useForm();

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get<Recipe[]>("/recipes");
      setRecipes(data);
    } catch (error) {
      message.error("Failed to fetch recipes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (!hasGroup) {
      setLoading(false);
      return;
    }
    fetchRecipes();
  }, [fetchRecipes, hasGroup]);

  const handleEditClick = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    form.setFieldsValue({
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients.map(ing => ({
        ingredientName: ing.ingredientName,
        ingredientDescription: ing.ingredientDescription || "",
        quantity: ing.quantity || 1,
        unit: ing.unit,
        category: ing.category || "OTHER"
      }))
    });
    setIsEditModalOpen(true);
  };

  const handleSaveRecipe = async (values: RecipePutDTO) => {
    if (!editingRecipe) return;
    setIsSaving(true);
    try {
      await api.put(`/recipes/${editingRecipe.id}`, values);
      message.success("Recipe updated successfully");
      setIsEditModalOpen(false);
      setEditingRecipe(null);
      await fetchRecipes();
    } catch (error) {
      message.error("Failed to update recipe");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const UNITS = ["GRAM", "KILOGRAM", "MILLILITER", "CENTILITER", "LITER", "PIECE", "TABLESPOON", "TEASPOON", "CUP"];
  const CATEGORIES = ["VEGETABLE", "FRUIT", "MEAT", "FISH", "DAIRY", "EGGS", "PLANT_PROTEIN", "GRAIN", "BAKERY", "BAKING", "HERB", "SPICE", "OIL", "CONDIMENT", "OTHER"];

  if (isGroupLoading) {
    return (
      <DashboardShell headerTitle="Recipes" selectedMenuKey="4">
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </DashboardShell>
    );
  }

  if (!hasGroup) {
    return (
      <DashboardShell headerTitle="Recipes" selectedMenuKey="4">
        <GroupRequired featureName="Recipes" />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell headerTitle="Recipes" selectedMenuKey="4">
      <div className="mb-8">
        <Title level={2} className="!m-0 !text-slate-900">
          Simple Recipes
        </Title>
        <Paragraph className="text-slate-500 mt-2">
          Browse our selection of simple recipes to add to your meal plan.
        </Paragraph>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={recipes}
          renderItem={(recipe) => (
            <List.Item key={recipe.id}>
              <Card
                title={recipe.name}
                extra={
                  <Button 
                    type="text" 
                    icon={<EditOutlined className="text-primary-500" />} 
                    onClick={() => handleEditClick(recipe)}
                    className="hover:!bg-primary-50"
                  />
                }
                hoverable
                className="h-full shadow-sm rounded-xl border-slate-200 overflow-hidden"
                styles={{
                  body: {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  },
                }}
              >
                <Paragraph
                  ellipsis={{ rows: 2 }}
                  className="text-slate-500 mb-4"
                >
                  {recipe.description}
                </Paragraph>
                <div className="mt-auto">
                  <Text strong className="block mb-2 text-slate-700">
                    Ingredients:
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.map((ing) => (
                      <Tag
                        key={ing.id}
                        color="blue"
                        className="rounded-full px-3 border-none bg-blue-50 text-blue-600"
                      >
                        {ing.ingredientName}: {ing.quantity}{" "}
                        {ing.unit?.toLowerCase() ?? "-"}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        title={<Title level={3} className="!m-0">Edit Recipe</Title>}
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingRecipe(null);
        }}
        onOk={() => form.submit()}
        confirmLoading={isSaving}
        width={700}
        okText="Save Changes"
        okButtonProps={{ className: "pm-button-primary" }}
        cancelButtonProps={{ className: "pm-button-secondary" }}
        centered
        className="recipe-edit-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveRecipe}
          className="mt-6"
        >
          <Form.Item
            name="name"
            label={<Text strong>Recipe Name</Text>}
            rules={[{ required: true, message: "Please enter the recipe name" }]}
          >
            <Input placeholder="e.g. Tomato Pasta" className="rounded-lg h-10" />
          </Form.Item>

          <Form.Item
            name="description"
            label={<Text strong>Description</Text>}
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} placeholder="Describe how to prepare this meal..." className="rounded-lg" />
          </Form.Item>

          <Divider orientation="left" className="!mb-4">
            <Text strong className="text-slate-400">Ingredients</Text>
          </Divider>

          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "ingredientName"]}
                      rules={[{ required: true, message: "Missing name" }]}
                      style={{ width: 180, marginBottom: 0 }}
                    >
                      <Input placeholder="Ingredient" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Missing qty" }]}
                      style={{ width: 80, marginBottom: 0 }}
                    >
                      <InputNumber min={0.1} placeholder="Qty" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "unit"]}
                      rules={[{ required: true, message: "Missing unit" }]}
                      style={{ width: 120, marginBottom: 0 }}
                    >
                      <Select placeholder="Unit">
                        {UNITS.map(unit => (
                          <Option key={unit} value={unit}>{unit.toLowerCase()}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "category"]}
                      style={{ width: 140, marginBottom: 0 }}
                    >
                      <Select placeholder="Category">
                        {CATEGORIES.map(cat => (
                          <Option key={cat} value={cat}>{cat.replace("_", " ").toLowerCase()}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <DeleteOutlined 
                      className="text-red-400 hover:text-red-600 transition-colors"
                      onClick={() => remove(name)} 
                    />
                  </Space>
                ))}
                <Form.Item className="mt-4">
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    block 
                    icon={<PlusOutlined />}
                    className="h-10 rounded-lg border-primary-200 text-primary-500 hover:text-primary-600 hover:border-primary-400"
                  >
                    Add Ingredient
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </DashboardShell>
  );
};

export default RecipesPage;
