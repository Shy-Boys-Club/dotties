package dottiesaws

import (
	"context"
	"io"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var (
	awsAccessKey string
	awsSecret    string
	awsRegion    string
	bucketName   string
	bucketUrl    string
)

func init() {
	awsAccessKey = os.Getenv("AWS_ACCESS_KEY")
	awsSecret = os.Getenv("AWS_SECRET")
	awsRegion = os.Getenv("AWS_REGION")
	bucketName = os.Getenv("AWS_BUCKET_NAME")
	bucketUrl = os.Getenv("AWS_BUCKET_URL")
}

func getClient() *s3.Client {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(awsRegion),
	)

	if err != nil {
		log.Fatal("Can't get aws instance", err)
	}

	client := s3.NewFromConfig(cfg)
	return client
}

func UploadImageToS3(filename string, data io.Reader) (*s3.PutObjectOutput, error, string) {
	client := getClient()
	input := &s3.PutObjectInput{
		Bucket: &bucketName,
		Key:    &filename,
		Body:   data,
	}
	output, err := client.PutObject(context.TODO(), input)
	imageUrl := bucketUrl + filename

	return output, err, imageUrl
}
