# React-app

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions._

object Main {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("MappingRulesExample")
      .master("local[*]") // Use 'local[*]' for local testing
      .getOrCreate()

    // Sample data for BCS DataFrame
    val bcsData = Seq(
      (1, "A", 10),
      (2, "B", 20),
      (3, "C", 30),
      (4, "D", 40),
      (5, "E", 50)
    )
    val bcsSchema = List("fsi", "fieldA", "fieldB")
    val bcsDF = spark.createDataFrame(bcsData).toDF(bcsSchema: _*)

    // Sample data for mappingRules DataFrame
    val mappingData = Seq(
      ("in", "fieldA", "A", "Category1"),
      ("Not in", "fieldA", "D", "Category2"),
      ("in", "fieldA", "E", "Category3"),
      ("in", "fieldB", "10", "Category4"),
      ("Not in", "fieldB", "40", "Category5")
    )
    val mappingSchema = List("rule", "field", "value", "category")
    val mappingDF = spark.createDataFrame(mappingData).toDF(mappingSchema: _*)

    // Function to check conditions and add 'category' column to BCS DataFrame
    def addCategoryColumn(bcsDF: DataFrame, mappingDF: DataFrame): DataFrame = {
      val joinedDF = bcsDF.crossJoin(mappingDF)
        .where(
          col("BCS.fsi") === col("mappingRules.fsi") &&
          (
            (col("mappingRules.rule") === "in" && col("BCS." + col("mappingRules.field")) === col("mappingRules.value")) ||
            (col("mappingRules.rule") === "Not in" && col("BCS." + col("mappingRules.field")) =!= col("mappingRules.value"))
          )
        )
        .select("BCS.fsi", "mappingRules.category")

      val categoryValues = mappingDF.select("category").distinct().collect().map(_.getString(0))
      val categoryColumns = categoryValues.map(category => when(col("category") === category, category))

      bcsDF.join(joinedDF, Seq("fsi"), "left_outer")
        .select(
          col("BCS.*"),
          coalesce(categoryColumns: _*).alias("category")
        )
    }

    // Adding the 'category' column to BCS DataFrame based on mappingRules DataFrame
    val resultDF = addCategoryColumn(bcsDF, mappingDF)

    resultDF.show()
  }
}
