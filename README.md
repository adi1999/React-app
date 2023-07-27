import org.apache.spark.sql.{SparkSession, DataFrame}
import org.apache.spark.sql.functions._

object DataFrameJoinCaseInsensitive {
  def main(args: Array[String]): Unit = {
    // Create a SparkSession
    val spark = SparkSession.builder()
      .appName("DataFrameJoinCaseInsensitive")
      .master("local[*]") // Use 'local[*]' for local testing; change accordingly for cluster deployment
      .getOrCreate()

    // Sample data for DataFrame1
    val data1 = Seq(
      ("John", 25),
      ("alice", 30),
      ("Mary", 22)
    )
    val columns1 = Seq("Name", "Age")
    val df1 = spark.createDataFrame(data1).toDF(columns1: _*)

    // Sample data for DataFrame2
    val data2 = Seq(
      ("JOHN", "Engineer"),
      ("ALICE", "Doctor"),
      ("mike", "Teacher")
    )
    val columns2 = Seq("Name", "Profession")
    val df2 = spark.createDataFrame(data2).toDF(columns2: _*)

    // Join the DataFrames with case insensitivity
    val joinedDF = joinDataFramesCaseInsensitive(df1, df2, "Name")

    // Show the result
    joinedDF.show()
  }

  // Function to join DataFrames with case insensitivity on the specified column
  def joinDataFramesCaseInsensitive(df1: DataFrame, df2: DataFrame, joinColumn: String): DataFrame = {
    // Create a new column in each DataFrame containing the lowercased version of the join column
    val df1Lowercased = df1.withColumn("joinKey", lower(col(joinColumn)))
    val df2Lowercased = df2.withColumn("joinKey", lower(col(joinColumn)))

    // Perform the join on the lowercased join key
    val joinedDF = df1Lowercased.join(df2Lowercased, Seq("joinKey"), "inner")

    // Select the columns from the original DataFrames and drop the temporary joinKey column
    val selectColumns = df1.columns ++ df2.columns.drop(1).map(colName => s"${colName}_2")
    val resultDF = joinedDF.select(selectColumns.map(col): _*)

    resultDF
  }
}

    
